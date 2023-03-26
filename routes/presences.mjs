import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()
import {index, api_lectures, api_presences, api_addPresenceToDb} from '../controllers/presencesController.mjs'

router.get('/',redirectLoginTeacher, index)
router.post('/api_lectures', redirectLoginTeacher, api_lectures)
router.post('/api_presences', redirectLoginTeacher, api_presences)
router.post('/api_addPresenceToDb', redirectLoginTeacher, api_addPresenceToDb)

export {router}
