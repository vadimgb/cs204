import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'


var router = express.Router()
import {dashboard} from '../controllers/teacherController.mjs'

router.get('/dashboard', redirectLoginTeacher, dashboard)

export {router}


