var express = require('express')
var {redirectLoginTeacher} = require('../helper.js')
var router = express.Router()
const gradebook_controller = require('../controllers/gradebookController.js')

router.get('/',redirectLoginTeacher, gradebook_controller.index)
router.post('/api_pset', redirectLoginTeacher, gradebook_controller.api_pset)
router.post('/api_grades', redirectLoginTeacher, gradebook_controller.api_grades)
router.post('/api_addGradeToDb', redirectLoginTeacher, gradebook_controller.api_addGradeToDb)
router.post('/api_addNotesToDb', redirectLoginTeacher, gradebook_controller.api_addNotesToDb)

module.exports = router
