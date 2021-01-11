var express = require('express')
var {redirectLoginTeacher} = require('../helper.js')


var router = express.Router()
const teacher_controller = require('../controllers/teacherController.js')

router.get('/dashboard', redirectLoginTeacher, teacher_controller.dashboard)

module.exports = router


