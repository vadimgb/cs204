const {pool} = require('../models/pgConfig')

exports.dashboard = (req, res) =>
{
	res.render('teacher/dashboard.ejs')
}


