import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	res.render('pending/index.ejs')
}

async function api_grades(req, res) 
{
	const sql2 =`select ch.house, ch.lastname, ch.firstname, 
		problemset.name, problemset.description, 
		g.id_problemset, g.grade, g.is_done, g.url, g.id_character, g.notes
 		from  
		(select * from gradebook  where is_done = true and is_checked = false) g 
		left join  
		(select c.id, c.lastname, c.firstname, houses.house from characters as c left join houses on c.id_house = houses.id) ch
		on g.id_character = ch.id
		left join problemset on g.id_problemset = problemset.id;`


	let result = await pool.query(sql2);
	res.send(JSON.stringify(result.rows))
}


export {index, api_grades}
