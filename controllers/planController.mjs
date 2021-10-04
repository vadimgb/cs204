import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	const request2 = await pool.query('select id, name from problemset;')
	res.render('plan/index.ejs', {houses: request.rows, pset: request2.rows})
}

async function api_list(req, res) 
{
	const id_house = req.body.id_house
	const problemset = await pool.query(`select problemset.name, problemset.id 
		from problemset join plan on id_problemset = problemset.id 
		where id_house = $1;`, [id_house])
	res.send(JSON.stringify(problemset.rows))
}

async function api_add(req, res) 
{
	const id_pset = req.body.id_pset
	const id_house = req.body.id_house
	try
	{
		const sql1 = `insert into  plan (id_problemset, id_house) values ($1, $2);`
		const sql2 = `insert into gradebook (id_character, id_problemset, grade, notes, is_done, is_checked, url)  
			select id, $1 as id_probemset, 0 as grade,' ' as notes, false as is_done, false as is_checked, 
			' ' as url from characters where id_house = $2;`
		await pool.query(sql1, [id_pset, id_house])
		await pool.query(sql2, [id_pset, id_house])
		res.send('Ok')
	}
	catch(err)
	{
		console.log("Повтороне значение-----------------------------------------------")
		console.log(err)
		res.status(500).send('repeted values')
	}
}


async function api_delete(req, res) 
{
	const remove_list = req.body.remove_list
	const id_house = req.body.id_house
	try
	{
	const sql = `delete from plan where id_house=${id_house} and id_problemset in (${remove_list});` 
	const sql2 = `delete from gradebook where id_problemset in (${remove_list}) and id_character in (select id from characters where id_house = ${id_house});`
	await pool.query(sql)
	await pool.query(sql2)
	res.send('Ok')
	}
	catch(err)
	{
		console.log('Error in deleting ----------------------------')
		console.log(err)
	}
}


export {index, api_list, api_add, api_delete}
