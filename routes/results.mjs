import express from  'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()
import {index, api_grades, api_delete} from '../controllers/resultsController.mjs'

router.get('/', redirectLoginTeacher, index)
router.post('/api_grades', redirectLoginTeacher, api_grades)
router.post('/api_delete', redirectLoginTeacher, api_delete)

export {router}
