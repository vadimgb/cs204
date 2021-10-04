import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	res.render('pending/index.ejs')
}

async function api_grades(req, res) 
{
	const sql1 = `select select1.firstname, select1.lastname, select1.house, select1.is_active, 
		gradebook.grade, gradebook.url, gradebook.notes, 
		gradebook.is_done, gradebook.is_checked,  gradebook.timestamp_done, gradebook.id_character, gradebook.id_problemset
		from (select characters.id, firstname, lastname,  houses.house, houses.is_active from  characters 
		join houses on characters.id_house = houses.id) select1
		left join gradebook on select1.id = gradebook.id_character where 
		gradebook.is_done = true and gradebook.is_checked = false and is_active order by house;` 
	let result = await pool.query(sql1);
	res.send(JSON.stringify(result.rows))
}


export {index, api_grades}
