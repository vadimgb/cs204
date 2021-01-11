const {pool} = require('../models/pgConfig')

exports.list = (req, res) =>
{
	res.render('problemset/pset.ejs')
}


exports.api_list = async (req, res) =>
{
	const problemset = await pool.query('select * from problemset;')
	res.end(JSON.stringify(problemset.rows))
}

exports.api_add = async (req, res) =>
{
	await pool.query(`insert into problemset (name) values ($1)`, [req.body.name])
	res.end('ok')
}

exports.api_delete = async (req, res) =>
{
	const remove_list = req.body.remove_list
	const sql = `delete from problemset where id in (${remove_list})`
	await pool.query(sql)
	res.end('Ok')
}
