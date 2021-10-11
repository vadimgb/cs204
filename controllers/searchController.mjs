import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	const request = await pool.query('select * from houses where id <> 1 and is_active = true;')
	res.render('search/index.ejs', {houses: request.rows})
}

async function api_search(req, res) 
{
	const id_house = req.body.id_house
	const emailSelect = req.body.emailSelect
	const lastnameSelect = req.body.lastnameSelect


	const sql_house = `select characters.id, lastname, firstname, email, houses.house from (characters join houses on characters.id_house = houses.id) where houses.id=$1;`

	const sql_email = `select characters.id, lastname, firstname, email, houses.house from (characters join houses on characters.id_house = houses.id) where email=$1;`

	const sql_lastname = `select characters.id, lastname, firstname, email, houses.house from (characters join houses on characters.id_house = houses.id) where lastname=$1;`

	const sql_wrong_mail = `select characters.id, lastname, firstname, email, houses.house from (characters join houses on characters.id_house = houses.id) where email like '%users%';`
	
	let characters;

	if(id_house)
	{
		characters = await pool.query(sql_house, [id_house])
	}
	else if(emailSelect)
	{
		console.log(sql_email)
		console.log(emailSelect)
		characters = await pool.query(sql_email, [emailSelect])
	}
	else if(lastnameSelect)
	{
		characters = await pool.query(sql_lastname, [lastnameSelect])
	}
	else
	{
		characters = await pool.query(sql_wrong_mail)
	}
		

	res.send(JSON.stringify(characters.rows))
}

async function api_update_email(req, res)
{
	const sql1 = `update characters set email=$1 where id=$2;`
	await pool.query(sql1, [req.body.email, req.body.char_id]) 
	res.end('ok')
}



export {index, api_search, api_update_email}
