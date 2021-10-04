import  express from 'express'
var router = express.Router()
import {index, callback} from  '../controllers/loginController.mjs'

router.get('/', index)
router.get('/callback', callback) 

export  {router}
