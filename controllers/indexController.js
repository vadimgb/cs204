exports.index = (req, res) => res.render('index/index.ejs')
exports.logout = (req, res) => {
	req.session = null
	res.redirect('/')
}


