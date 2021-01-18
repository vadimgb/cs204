const fetch = require('node-fetch')
require('dotenv').config()
const token1 ='360ce9ccde4181ec6a3a55de94dfe088c08faad4'
deleteRepo(token1, 'vadimgb1')
//getRepo(token1, 'vadimgb1')

async function deleteRepo(org_token,  name)
{
	const body = {
		'acsept': 'application/vnd.github.v3+json',
		'owner':'tspu1',
		'name': name
	}

	const url1 = `https://api.github.com/repos/tspu1/${name}`
	try
	{
		const res = await fetch(url1, 
			{
				method: 'delete',
				body: JSON.stringify(body), 
				headers:
				{
					"Accept": "application/vnd.github.v3+json",
					"Authorization": `token ${org_token}`
				}
			})
	//	const repos = await res.json()
		console.log(res)
	}
	catch(err)
	{
		console.log(err)
	}
}

async function getRepo(org_token, name)
{
	const url1 = `https://api.github.com/repos/tspu1/${name}`
	const res = await fetch(url1, 
		{
			method: 'get',
			headers:
			{
				"Authorization": `token ${org_token}`
			}
		})
	const repos = await res.json()
	console.log(repos)
}

