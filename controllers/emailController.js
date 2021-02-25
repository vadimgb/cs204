const nodemailer = require('nodemailer')
require('dotenv').config()
const {pool} = require('../models/pgConfig')

exports.index = async (req, res) =>
{
	const request = await pool.query(`select * from houses where house <> 'Teacher' and is_active = true;`)
	res.render('email/index.ejs', {houses: request.rows})
}

exports.api_email = async (req, res) =>
{
	const id_house = req.body.id_house
	const message = req.body.message
	const subject = req.body.subject
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





