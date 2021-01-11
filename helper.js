//var cookieSession = require('cookie-session')
//const cookie_secret = process.env.COOKIE_SECRET
const fetch = require('node-fetch')

exports.redirectLoginTeacher = function (req, res, next)
{
	if(!req.session.usenrname && req.session.id_house != 1)
		res.send('Only Teacher may be hear')
	else
		next()
}

exports.redirectLogin = function (req, res, next)
{
	if(!req.session.username)
		res.redirect('/')
	else
		next()

}

exports.createRepo = async function(org_token, token, name)
{
	const haveR = await haveRepo(token, name)
	if(haveR)
		console.log('User have repository')
	else
	{
		const body = {
				'name': name,
				'description': 'psets',
				'homepage': 'https://github.com',
				'private': false,
				'auto_init': true
				}

		const url1 ="https://api.github.com/orgs/cs204/repos"
		await fetch(url1,
			{
				method: 'post',
				body: JSON.stringify(body), 
				headers:
				{
					"Authorization":`token ${org_token}`
				}	
			})
		await addCollaborator(org_token, name)
	}
}


//--------------
//
async function haveRepo(token, user)
{
	let haveR = false
	const res = await fetch("https://api.github.com/user/repos",
	{
		headers:
		{ 
			"Authorization": `token ${token}`
		}
	})
	const repos = await res.json()
	for(let repo of repos)
		if(repo.full_name == `cs204/${user}`)
			haveR = true
	return haveR
}

async function addCollaborator(org_token, name)
{
	const url1 = `https://api.github.com/repos/cs204/${name}/collaborators/${name}`
	const res = await fetch(url1,
		{
			method:'put', 
			headers:
			{
				"Authorization":`token ${org_token}`
			}	
		})
}


