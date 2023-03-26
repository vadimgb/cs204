import express from 'express'
var router = express.Router()
import {index, api_list, api_delete, api_add} from '../controllers/lecturesController.mjs'


router.get('/', index)
router.post('/api_list', api_list)
router.post('/api_delete', api_delete)
router.post('/api_add', api_add)

export {router}
