const {pool} = require('../models/pgConfig')
const util = require('util');
const urlExists = util.promisify(require('url-exists'));

exports.gradebook = async function (req, res)
{
	try
	{
		const sql1 = `select problemset.name , select1.grade, 
			select1.notes from problemset join (select id_problemset, 
			gradebook.grade, gradebook.notes from gradebook 
			join characters on characters.id = gradebook.id_character 
			where characters.username = $1) select1 
			on problemset.id = select1.id_problemset`
		const res2 = await pool.query(sql1, [req.session.username]) 
		res.render('character/gradebook.ejs', { "result": res2.rows, username: req.session.username}) 
	}
	catch(err)
	{
		console.log(err)
		res.send('error generating gradebook' + err)
	}
}

exports.pset = async function(req, res)
{
	res.render('character/pset.ejs',{id_pset: req.params.id_pset, type: req.params.type})
}

exports.api_pset = async (req, res) =>
	{
		let {url, id_problemset, username, type} = req.body
		const timestamp1 = new Date()
		if(type != 'v')
		{
			url = `https://github.com/cs204/${username}/tree/pset${id_problemset}`
		}
		
		const url_exists = await urlExists(url);
		try
		{
			const res1 = await pool.query(`select * from characters where username = $1;`,[username]);
			if(!res1.rows.length)
			{
				res.send('Нет пользователя с таким именем. User with such name does not exist');
			}
			else if(!url_exists)
			{
				res.send('Неправильный адрес url. Wrong url')
			}
			else
			{
				const id_character = res1.rows[0]['id']
				const res2 = await pool.query(`select * from gradebook where id_character=$1 and id_problemset=$2;`, [id_character, id_problemset]);
				if(res2.rows.length)
				{
					await pool.query(`update gradebook set is_done=true, url=$3, grade=0, is_checked=false, timestamp_done=$4 where id_character=$1 and id_problemset=$2;`,[id_character, id_problemset, url, timestamp1])
				}
				else
				{
					await pool.query(`insert into gradebook (id_character, id_problemset, grade, is_done, is_checked, url, timestamp_done) values ($1, $2, $3, $4, $5, $6, $7);`,[id_character, id_problemset, 0,  true, false, url, timestamp1]) 
				}
				res.send(`Ok. Вы отправили задание на проверку`)
			}
		}
		catch(err)
		{
			console.log(err)
		}
	}


