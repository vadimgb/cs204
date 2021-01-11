var express = require('express')
var {redirectLogin} = require('../helper.js')
var router = express.Router()
const character_controller = require('../controllers/characterController.js')

router.get('/gradebook', redirectLogin, character_controller.gradebook)
router.get('/pset/:id_pset/:type', character_controller.pset)
router.post('/api_pset', character_controller.api_pset)

module.exports = router

