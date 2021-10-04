import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

import {pool} from '../models/pgConfig.mjs'

async function index(req, res) 
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	res.render('email/index.ejs', {houses: request.rows})
}

async function  api_email(req, res) 
{
	const id_house = req.body.id_house
	const message = req.body.message
	const subject = req.body.subject
	const sql1 = `insert into emails (id_house, subject, message) values ($1, $2, $3);`
	await pool.query(sql1, [id_house, subject, message])
	const sql = `select firstname, surname, email from characters where id_house = $1;`
	const result = await pool.query(sql, [id_house])
	const errors = []
	const infos = []
	const transport = nodemailer.createTransport({ 
			host: process.env.SMTP_SERVER, 
			port: process.env.SMTP_PORT, 
			auth: { 
				user: process.env.EMAIL_USER, 
				pass: process.env.EMAIL_PASSWORD 
			}
		})

	let taskCounter = result.rows.length
	transport.verify(async (error, success) =>
	{
		if(error) console.log(error)
		else{
			for(const user of result.rows)
			{
				const messageAll = { 
					from : process.env.EMAIL_SENDER, 
					to: user.email, 
					subject: subject, 
					text: `Здравствуйте, ${user.firstname} ${user.surname}. ${message}` 
				}

				await transport.sendMail(messageAll, (err, info) => 
					{ 
						if(err)
						{
							errors.push(err)
						}
						else
						{
							infos.push(info)
						}
						taskCounter--
						if(taskCounter == 0) {
							transport.close()
							const msg = {'errors':errors, 'infos': infos}
							res.send(JSON.stringify(msg))
						} 
					}) 
			}
		}
	})

}




export {index, api_email}
