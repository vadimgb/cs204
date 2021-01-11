const {pool} = require('../models/pgConfig')
const fetch = require('node-fetch')
//const cookieSession = require('cookie-session')
//const cookie_secret = process.env.COOKIE_SECRET

const client_id = process.env.GITHUB_CLIENT_ID 
const client_secret = process.env.GITHUB_CLIENT_SECRET
const host = '90.188.117.161'
const PORT = process.env.PORT || 8000

//1. Request a user's GitHub identity
exports.index = async (req, res) =>
{
	const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://${host}:${PORT}/login/github/callback`
	res.redirect(url)
}

//2. User are redirected back with temporary code (10 minutes).  Exchange code for access token.
//3. Use token to access api
exports.callback = async (req, res) => 
{
	const code = req.query.code // take code from request
	const token = await getAccessToken(code)//change code on access token
	const username = await getGithubUser(token)//use token to access api
	const email = await getUserEmail(token)
	if(username)
	{
		req.session.username = username 
		req.session.token = token 
		req.session.email = email
		//Check user in database
		const res1 = await pool.query(`select * from characters where username = $1`, [username])
		if(res1.rows.length == 0)
		{
			res.redirect('/register')
		}
		else
		{ 
			req.session.id_house = res1.rows[0].id_house
			if(req.session.id_house == 1)
			{
				res.redirect('/teacher/dashboard')
			}
			else
			{	
				res.redirect('/character/gradebook')
			}

		}
	}
	else
	{
		console.log('Error')
		res.send('Ошибка входа')
	} 
}

//
//----------------help functions
async function getAccessToken(code)//change code for access token.
{
	const res = await fetch('https://github.com/login/oauth/access_token',
		{
			method: 'POST',
			headers:{
				'Content-Type':'application/json',
				'Accept':'application/json'},
			body: JSON.stringify({
				client_id,
				client_secret,
				code})
		})
	const data = await res.json()
	const token = data['access_token']
	return token 
}

async function getGithubUser(token)//use access token to access api
{
	const res = await fetch("https://api.github.com/user",
	{
		headers:
		{ 
			"Authorization": `token ${token}`
		}
	})
	const data = await res.json()
	return data['login']
}

async function getUserEmail(token)
{
	const res = await fetch("https://api.github.com/user/emails",
	{
		headers:
		{ 
			"Authorization": `token ${token}`
		}
	})
	const data = await res.json()
	return data[0]['email']
}


