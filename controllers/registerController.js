const {pool} = require('../models/pgConfig')
const {createRepo, } =require('../helper.js')

exports.index = async (req, res)=>
	{
		const sql1 = `select id, house from houses where id <> 1;`
		pool.query(sql1, (err, res1)=>
			{
				if(err)
					console.log('Error in taking house:\n', err)
				res.render('register/index.ejs', {
					houses: res1.rows,
					username: req.session.username, 
					email: req.session.email})
			})
	}

exports.register =  async (req, res)=>
	{
		await createRepo(process.env.TSPU_TOKEN, req.session.token, req.session.username)
		const {firstname, lastname, surname, id_house} = req.body
		req.session.id_house = id_house
		const sql1 = `insert into characters (username, lastname, firstname, surname, email, id_house)
			values ($1, $2, $3, $4, $5, $6);`
		try
		{ 
			await pool.query(sql1, [req.session.username, lastname, firstname, surname, req.session.email, id_house])
			const result = await pool.query('select id from characters where username = $1;', [req.session.username])
			const id_character = result.rows[0].id
			const pset = await pool.query('select * from plan where id_house = $1;', [id_house])
			for(let row of pset.rows)
			{
				await pool.query(`insert into gradebook (id_character, id_problemset, is_done, grade, is_checked)
					values ($1, $2, false, 0, false);`, [id_character, row.id_problemset])
			}
			res.redirect('/character/gradebook')
		}
		catch(err)
		{ 
			res.send('Error adding date to db')
			console.log("Error in registering", err)
		}

	}
		


