import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()
import {index, api_pset, api_grades, api_addGradeToDb, api_addNotesToDb} from '../controllers/gradebookController.mjs'

router.get('/',redirectLoginTeacher, index)
router.post('/api_pset', redirectLoginTeacher, api_pset)
router.post('/api_grades', redirectLoginTeacher, api_grades)
router.post('/api_addGradeToDb', redirectLoginTeacher, api_addGradeToDb)
router.post('/api_addNotesToDb', redirectLoginTeacher, api_addNotesToDb)

export {router}
