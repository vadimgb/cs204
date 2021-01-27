var express = require('express')
var {redirectLoginTeacher} = require('../helper.js')
var router = express.Router()
const results_controller = require('../controllers/resultsController.js')

router.get('/', redirectLoginTeacher, results_controller.index)
router.post('/api_grades', redirectLoginTeacher, results_controller.api_grades)
router.post('/api_delete', redirectLoginTeacher, results_controller.api_delete)

module.exports = router
