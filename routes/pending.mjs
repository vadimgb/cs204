import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()
import {index, api_grades} from '../controllers/pendingController.mjs'

router.get('/',redirectLoginTeacher, index)
router.post('/api_grades', redirectLoginTeacher, api_grades)


export {router}
