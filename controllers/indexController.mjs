function index(req, res) {res.render('index/index.ejs')}
function logout(req, res){
	req.session = null
	res.redirect('/')
}

export {index, logout}


