import {pool} from '../models/pgConfig.mjs'

function dashboard(req, res) 
{
	res.render('teacher/dashboard.ejs')
}

export {dashboard}


