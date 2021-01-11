var express = require('express')
var router = express.Router()
const plan_controller = require('../controllers/planController.js')


router.get('/', plan_controller.index)
router.post('/api_list', plan_controller.api_list)
router.post('/api_delete', plan_controller.api_delete)
router.post('/api_add', plan_controller.api_add)

module.exports = router
