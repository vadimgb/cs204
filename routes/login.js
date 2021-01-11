var express = require('express')
var router = express.Router()
const login_controller = require('../controllers/loginController.js')

router.get('/', login_controller.index)
router.get('/callback',login_controller.callback) 

module.exports = router
