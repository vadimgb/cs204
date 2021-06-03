const fetch = require('node-fetch')
require('dotenv').config()
;(async ()=>console.log(await
existsRepo('cs204', process.env.TSPU_TOKEN, 'vadimgb2')))();

async function existsRepo(org_name,  token, username)
{
	const url1 = `https://api.github.com/repos/${org_name}/${username}`;
	console.log(url1);
	const res = await fetch(url1, 
		{
			method: "get",
			headers:
			{
				"Accept": "application/vnd.github.v3+json",
				"Authorization": `token ${token}`
			}
		})

	return res.status == 200;
}

