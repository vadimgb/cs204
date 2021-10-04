import express from 'express'
var router = express.Router()
import {index, logout} from '../controllers/indexController.mjs'
router.get('/', index)
router.get('/logout', logout)
export  {router}





