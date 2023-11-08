import {pool} from '../models/pgConfig.mjs'
import {deleteRepo} from '../helper.mjs'

function list(req, res) 
{
	res.render('houses/houses.ejs')
}


async function api_list(req, res) 
{
	const houses = await pool.query('select * from houses;')
	res.end(JSON.stringify(houses.rows))
}

async function api_add(req, res)
{
	await pool.query(`insert into houses (house, is_active, id_education_type) values ($1, true, 1)`, [req.body.house])
	res.end('ok')
}

async function api_delete(req, res)
{
	const remove_list = req.body.remove_list
	try
	{
		const sql =`select id, username from characters where id_house in (${remove_list});` 
		const characters = await pool.query(sql)
		const characters_id = []
		for (const elm of characters.rows){
			characters_id.push(elm['id'])
		}


		if(characters_id.length)
		{
			const sql2 = `delete from gradebook where id_character in (${characters_id}); 
			delete from presences where id_character in (${characters_id}); 
			delete from characters where id in (${characters_id});`

			await pool.query(sql2)	
			for(let i = 0; i < characters.rows.length; i++)
			{ 
				console.log(`delete repo ${characters.rows[i]['username']} from ${process.env.ORGANIZATION}`)
				await deleteRepo(process.env.ORGANIZATION, process.env.TSPU_TOKEN, characters.rows[i]['username'])
			}

		}

		if(remove_list.length)
		{
			const sql3 = `delete from plan  where id_house in (${remove_list});
			delete from lectures where id_house in (${remove_list});
			delete from emails  where id_house in (${remove_list});
			delete from houses where id in (${remove_list});`

			await pool.query(sql3)
		}

		res.send('Ok')
	/*
		if(characters.rows.length)
		{
			for(let i = 0; i < characters.rows.length; i++)
			{ 
				console.log(`delete repo ${characters.rows[i]['username']} from ${process.env.ORGANIZATION}`)
				await deleteRepo(process.env.ORGANIZATION, process.env.TSPU_TOKEN, characters.rows[i]['username'])
			}
		}
		*/
	}
	catch(err)
	{
		console.log('Error in deleting ----------------------------')
		console.log(err)
	}
}

export {list, api_list, api_add, api_delete}
