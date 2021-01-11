var express = require('express')
var router = express.Router()
var index_controller = require('../controllers/indexController.js')

router.get('/', index_controller.index)
router.get('/logout', index_controller.logout)
module.exports = router





