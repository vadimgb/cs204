import {pool} from './models/pgConfig.mjs'

async function api_delete(req_list, res)
{
	const remove_list = req_list 
	try
	{
		const sql =`select id, username, id_house from characters where id_house in (${remove_list});` 
		const characters = await pool.query(sql)
		console.log(characters.rows)

		const characters_id = []
		for (const elm of characters.rows){
			characters_id.push(elm['id'])
		}
		console.log(characters_id)

		const sql2 = `select * from gradebook where id_character in (${characters_id});` 

		if(characters.rows.length) 
		{ 
			for(let i = 0; i < characters.rows.length; i++)
			{ 
				console.log(`delete repo ${characters.rows[i]['username']}`)
				//deleteRepo(process.env.ORGANIZATION, process.env.TSPU_TOKEN, characters.rows[i]['username'])
		}
	}
	let res2 = await pool.query(sql2)		
	console.log(res2.rows)
	const sql3 = `select * from houses where id in (${remove_list})`
	let res3 = await pool.query(sql3)
	console.log(res3.rows)

	}
	catch(err)
	{
		console.log('Error in deleting ----------------------------')
		console.log(err)
	}
}

const res = await api_delete([1, 2, 3], 'ups')
