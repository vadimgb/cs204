import express from 'express'
var router = express.Router()
import  {redirectLogin} from '../helper.mjs'


import {index, register} from '../controllers/registerController.mjs'

router.get('/', redirectLogin, index)
router.post('/', redirectLogin, register)

export {router}
