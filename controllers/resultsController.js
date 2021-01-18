const {pool} = require('../models/pgConfig')

exports.index = async (req, res) =>
{
	const request = await pool.query('select * from houses where id <> 1 and is_active = true;')
	res.render('results/index.ejs', {houses: request.rows})
}



exports.api_grades = async (req, res) =>
{
	const id_house = req.body.id_house
	const result = {}
	const pset = await pool.query('select id_problemset, name from problemset join plan on id_problemset = problemset.id where id_house = $1;', [id_house])
	result.pset = pset.rows
	const gradebook = []
	const characters = await pool.query('select id, firstname, lastname, surname from characters where id_house = $1 order by lastname;', [id_house])
	for(let row of characters.rows)
	{
		const character = {}
		character.id = row['id']
		character.firstname = row['firstname']
		character.lastname =row['lastname']
		character.surname = row['surname']
		character.grades = {} 
		try{
			const grades = await pool.query('select id_problemset, grade from gradebook where id_character = $1;', [row['id']])
			for(let row2 of grades.rows)
			{
				character.grades[row2['id_problemset']] = row2['grade']
			}
		}
		catch(err)
		{
			console.log('grades qeury error------', err)
		}
		
		gradebook.push(character)
	}
	result.gradebook = gradebook
	res.send(JSON.stringify(result))
}
