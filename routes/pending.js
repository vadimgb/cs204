var express = require('express')
var {redirectLoginTeacher} = require('../helper.js')
var router = express.Router()
const pending_controller = require('../controllers/pendingController.js')

router.get('/',redirectLoginTeacher, pending_controller.index)
router.post('/api_grades', redirectLoginTeacher, pending_controller.api_grades)


module.exports = router
