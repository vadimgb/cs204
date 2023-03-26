import express from 'express'
var router = express.Router()
import {list, api_list,  api_add, api_delete} from '../controllers/subjectsController.mjs'

router.get('/', list)

router.post('/api_list', api_list)

router.post('/api_add', api_add)

router.post('/api_delete', api_delete)


export {router}
