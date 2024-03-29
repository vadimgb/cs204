import {pool} from '../models/pgConfig.mjs'
import {sendEmail } from '../helper.mjs'

async function index(req, res) 
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	res.render('gradebook/index.ejs', {houses: request.rows})
}

async function api_pset(req, res) 
{
	const id_house = req.body.id_house
	const sql = `select name, id from problemset 
	join (select id_house, id_problemset from plan where id_house = $1) select1 on
	problemset.id = select1.id_problemset`
	const result = await pool.query(sql, [id_house])
	res.send(JSON.stringify(result.rows))
}

async function api_grades(req, res) 
{
	const id_pset = req.body.id_pset 
	const id_house = req.body.id_house
	const sql1 = `select characters.firstname, characters.lastname, select1.grade, select1.url, select1.notes, 
		select1.is_done, select1.is_checked,  select1.timestamp_done, select1.id_character, select1.id_problemset
		from characters 
		left join (select * from gradebook where id_problemset = $1) select1 
		on characters.id = select1.id_character where id_house = $2 order by lastname;` 
	let result = await pool.query(sql1,[id_pset, id_house]);
	res.send(JSON.stringify(result.rows))
}

async function api_addGradeToDb(req, res) 
{
	const id_character = req.body.id_character
	const id_problemset = req.body.id_problemset
	const grade = req.body.grade
	const is_checked = grade ? true: false
	const sql = `update gradebook set grade = $1, is_checked = $4 where id_character = $2 and id_problemset = $3;`
	try{
		const result = await pool.query(sql, [grade, id_character, id_problemset, is_checked])
		res.send('ok')
	}
	catch(err)
	{
		console.log('cant change grade', err)
	}
	const sql2 = `select firstname, surname, email from characters where id = $1;`
	try{
	const result2 = await pool.query(sql2, [id_character])
	const sql3 = `select name from problemset where id = $1;`
	const result3 = await pool.query(sql3, [id_problemset])
	const email_to = result2.rows[0].email
	const firstname = result2.rows[0].firstname
	const surname = result2.rows[0].surname
	const subject = `Задание ${result3.rows[0].name}`
	const message = `Задание ${result3.rows[0].name} проверено.
	Смотрите результаты на http://${process.env.HOST} .`
	sendEmail(email_to, firstname, surname, subject, message)
	}catch(error)
	{
		console.log("cant send mail")
	}
}

async function api_addNotesToDb(req, res) 
{
	const id_character = req.body.id_character
	const id_problemset = req.body.id_problemset
	const notes = req.body.notes
	const sql = `update gradebook set notes = $1 where id_character = $2 and id_problemset = $3;`
	try{
		const result = await pool.query(sql, [notes, id_character, id_problemset])
		res.send('ok')
	}
	catch(err)
	{
		console.log('cant change grade', err)
	}
}

export {index, api_pset, api_grades, api_addGradeToDb, api_addNotesToDb}
