import fetch from 'node-fetch'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

function redirectLoginTeacher(req, res, next)
{
	if(!req.session.usenrname && req.session.id_house != 1)
		res.send('Only Teacher may be hear')
	else
		next()
}

function redirectLogin(req, res, next)
{
	if(!req.session.username)
		res.redirect('/')
	else
		next()

}

async function createRepo(org_name, org_token,  name)
{
	const haveR = await orgHaveRepo(org_name, org_token, name)

	if(haveR)
		console.log('Org have repository')
	else
	{
		const body = {
				'name': name,
				'description': 'psets',
				'homepage': 'https://github.com',
				'private': false,
				'auto_init': true
				}

		const url1 =`https://api.github.com/orgs/${org_name}/repos`
		await fetch(url1,
			{
				method: 'post',
				body: JSON.stringify(body), 
				headers:
				{
					"Authorization":`token ${org_token}`
				}	
			})
		await addCollaborator(org_name, org_token, name)
	}
}

async function deleteRepo(org_name, org_token, name)
{
	const haveR = await orgHaveRepo(org_name, org_token, name)
	if(haveR)
	{
		const url1 = `https://api.github.com/repos/${org_name}/${name}`
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

async function sendEmail(email_to, firstname, surname, subject, message)
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

async function orgHaveRepo(org_name,  token, username)
{
	const url1 = `https://api.github.com/repos/${org_name}/${username}`;
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


async function addCollaborator(org_name, org_token, name)
{
	const url1 = `https://api.github.com/repos/${org_name}/${name}/collaborators/${name}`
	const res = await fetch(url1,
		{
			method:'put', 
			headers:
			{
				"Authorization":`token ${org_token}`
			}	
		})
}


export {redirectLoginTeacher, redirectLogin, createRepo, deleteRepo, sendEmail, orgHaveRepo}
