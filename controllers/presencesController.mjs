import {pool} from '../models/pgConfig.mjs'
import {sendEmail } from '../helper.mjs'

async function index(req, res) 
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	res.render('presences/index.ejs', {houses: request.rows})
}

async function api_lectures(req, res) 
{
	const id_house = req.body.id_house
	const sql = `select sl1.id, subjects.name, sl1.date from subjects join (select id, id_subject, date::text from lectures where id_house = $1) as sl1 on sl1.id_subject = subjects.id;`
	const result = await pool.query(sql, [id_house])
	res.send(JSON.stringify(result.rows))
}

async function api_presences(req, res) 
{
	const id_lecture = req.body.id_lecture 
	const sql1 = ` select lastname, firstname, sl1.id_lecture, sl1.is_present, sl1.id from characters join (select id_character, id_lecture, is_present, id from presences where id_lecture=$1) as sl1 on sl1.id_character = characters.id order by lastname;`

	let result = await pool.query(sql1,[id_lecture]);
	res.send(JSON.stringify(result.rows))
}

async function api_addPresenceToDb(req, res) 
{
	const id_presence = req.body.id_presence
	const is_present = req.body.is_present
	const sql = `update presences set is_present = $2 where id = $1;`
	try{
		const result = await pool.query(sql, [id_presence, is_present])
		res.send('ok')
	}
	catch(err)
	{
		console.log('cant change presence', err)
	}
}


export {index, api_lectures, api_presences, api_addPresenceToDb}
