import {pool} from '../models/pgConfig.mjs'

function list(req, res) 
{
	res.render('subjects/subjects.ejs')

}


async function api_list(req, res) 
{
	const subjects = await pool.query('select * from subjects;')
	res.end(JSON.stringify(subjects.rows))
}

async function api_add(req, res)
{
	pool.query(`insert into subjects (name) values ($1)`, [req.body.name])
	.then((result)=> {console.log("I add it"); res.send('Ok')})
	.catch((err)=> {console.log("ups error"); 
		res.status(500).send('repeted values')})
}

async function api_delete(req, res)
{
	const remove_list = req.body.remove_list

		const sql1 = `delete from presences where id_lecture in (select id from lectures where id_subject in (${remove_list}));`
	const sql2 = ` delete from lectures where id_subject in (${remove_list});
	delete from subjects where id in (${remove_list});`
	await pool.query(sql1)
	await pool.query(sql2)
	res.end('Ok')
}

export {list, api_list, api_add, api_delete}
