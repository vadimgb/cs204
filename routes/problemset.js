var express = require('express')
var router = express.Router()
const problemset_controller = require('../controllers/problemsetController.js')

router.get('/', problemset_controller.list)

router.post('/api_list', problemset_controller.api_list)

router.post('/api_add', problemset_controller.api_add)

router.post('/api_delete', problemset_controller.api_delete)


module.exports = router
