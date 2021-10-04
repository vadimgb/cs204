import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()
import {index, api_email} from '../controllers/emailController.mjs'

router.get('/',redirectLoginTeacher, index)
router.post('/api_email', redirectLoginTeacher, api_email)

export  {router}
