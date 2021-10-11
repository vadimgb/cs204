import express from 'express'
import {redirectLoginTeacher} from '../helper.mjs'
var router = express.Router()

import {index, api_search, api_update_email} from '../controllers/searchController.mjs'

router.get('/', redirectLoginTeacher, index)
router.post('/api_search', redirectLoginTeacher, api_search)
router.post('/api_update_email', redirectLoginTeacher, api_update_email)

export {router}
