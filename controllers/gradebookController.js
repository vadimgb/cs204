const {pool} = require('../models/pgConfig')

exports.index = async (req, res) =>
{
	const request = await pool.query(`select * from houses where house <> 'Teacher';`)
	res.render('gradebook/index.ejs', {houses: request.rows})
}

exports.api_pset = async (req, res) =>
{
	const id_house = req.body.id_house
	const sql = `select name, id from problemset 
	join (select id_house, id_problemset from plan where id_house = $1) select1 on
	problemset.id = select1.id_problemset`
	const result = await pool.query(sql, [id_house])
	res.send(JSON.stringify(result.rows))
}

exports.api_grades = async (req, res) =>
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

exports.api_addGradeToDb = async (req, res) =>
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
}

exports.api_addNotesToDb = async (req, res) =>
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


