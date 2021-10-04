import {pool} from '../models/pgConfig.mjs'

function list(req, res) 
{
	res.render('problemset/pset.ejs')
}


async function api_list(req, res) 
{
	const problemset = await pool.query('select * from problemset;')
	res.end(JSON.stringify(problemset.rows))
}

async function api_add(req, res)
{
	await pool.query(`insert into problemset (name) values ($1)`, [req.body.name])
	res.end('ok')
}

async function api_delete(req, res)
{
	const remove_list = req.body.remove_list
	const sql = `delete from gradebook where id_problemset in (${remove_list});
	delete from plan where id_problemset in (${remove_list});
	delete from problemset where id in (${remove_list})`
	await pool.query(sql)
	res.end('Ok')
}

export {list, api_list, api_add, api_delete}
