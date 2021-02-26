const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
require('dotenv').config()

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

exports.deleteRepo = async function(org_token, name)
{
	const haveR = await orgHaveRepo(org_token, name)
	if(haveR)
	{
		const url1 = `https://api.github.com/repos/cs204/${name}`
		try
		{
			console.log(url1)
			
			await fetch(url1, 
				{
					method: 'delete',
					headers:
					{
						"Accept": "application/vnd.github.v3+json",
						"Authorization": `token ${org_token}`
					}
				})
		}
		catch(err)
		{
			console.log(err)
		}
	}
}

exports.sendEmail = async function(email_to, firstname, surname, subject, message)
{
	const transport = nodemailer.createTransport({ 
			host: process.env.SMTP_SERVER, 
			port: process.env.SMTP_PORT, 
			auth: { 
				user: process.env.EMAIL_USER, 
				pass: process.env.EMAIL_PASSWORD 
			}
		})
	const messageAll = { 
					from : process.env.EMAIL_SENDER, 
					to: email_to, 
					subject: subject, 
					text: `Здравствуйте, ${firstname} ${surname}. ${message}` 
				} 
	await transport.sendMail(messageAll, (err, info) => 
		{ 
			transport.close() 
		}
	) 
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

async function orgHaveRepo(token, username)
{
	let haveR = false
	const res = await fetch("https://api.github.com/orgs/cs204/repos",
		{
			headers:
			{
				"Authorization": `token ${token}`
			}
		})
	const repos = await res.json()
	for(let repo of repos)
		if(repo.name == username)
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



