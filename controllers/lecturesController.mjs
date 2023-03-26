import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	const request2 = await pool.query('select id, name from subjects;')
	res.render('lectures/index.ejs', {houses: request.rows, subjects: request2.rows})
}

async function api_list(req, res) 
{
	const id_house = req.body.id_house
	const lectures = await pool.query(`select subjects.name, lectures.id, lectures.date::text, lectures.notes 
		from subjects join lectures on id_subject = subjects.id 
		where id_house = $1;`, [id_house])
	res.send(JSON.stringify(lectures.rows))
}

async function api_add(req, res) 
{
	const id_subject = req.body.id_subject
	const id_house = req.body.id_house
	const date = req.body.date
	try
	{
		const sql1 = `insert into  lectures (id_subject, id_house) values ($1, $2);`
		const sql2 =`insert into presences (id_character, id_lecture)  
			(select id_character ,  id_lecture  
			from (select id as id_character from characters where 
			id_house = $2) as characters_list 
			cross join (select id as id_lecture from 
			lectures where id_subject = $1) as lec_l);`

		await pool.query(sql1, [id_subject, id_house])
		await pool.query(sql2, [id_subject, id_house])
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
	try
	{


		const sql = `delete from presences where id_lecture in  (${remove_list}); delete from lectures where  id in (${remove_list});` 

		await pool.query(sql)

	res.send('Ok')
	}
	catch(err)
	{
		console.log('Error in deleting ----------------------------')
		console.log(err)
	}
}


export {index, api_list, api_add, api_delete}
