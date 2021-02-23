var express = require('express')
var {redirectLoginTeacher} = require('../helper.js')
var router = express.Router()
const email_controller = require('../controllers/emailController.js')

router.get('/',redirectLoginTeacher, email_controller.index)
router.post('/api_email', redirectLoginTeacher, email_controller.api_email)

module.exports = router
