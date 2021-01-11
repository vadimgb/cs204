var express = require('express')
var router = express.Router()
var {redirectLogin} = require('../helper.js')


const register_controller = require('../controllers/registerController.js')

router.get('/', redirectLogin, register_controller.index)
router.post('/', redirectLogin, register_controller.register)

module.exports = router
