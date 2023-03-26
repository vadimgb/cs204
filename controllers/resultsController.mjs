import {pool} from '../models/pgConfig.mjs'
import {deleteRepo} from '../helper.mjs'

async function index(req, res) 
{
	const request = await pool.query('select * from houses where id <> 1 and is_active = true;')
	res.render('results/index.ejs', {houses: request.rows})
}



async function api_grades(req, res) 
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

async function api_delete(req, res)
{
	const remove_list = req.body.remove_list
	try
	{
	const sql =`select username from characters where id in (${remove_list});` 
	const sql2 = `delete from gradebook where id_character in (${remove_list});
	delete from presences where id_character in (${remove_list}); 
	delete from characters where id in (${remove_list});`
	const usernames = await pool.query(sql)
	if(usernames.rows.length)
	{
		for(let i = 0; i < usernames.rows.length; i++)
		{ 
			deleteRepo(process.env.ORGANIZATION, process.env.TSPU_TOKEN, usernames.rows[i]['username'])
		}
	}
	await pool.query(sql2)		
	res.send('Ok')
	}
	catch(err)
	{
		console.log('Error in deleting ----------------------------')
		console.log(err)
	}
}


export {index, api_grades, api_delete}
