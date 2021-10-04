import express from 'express'
import {redirectLogin} from '../helper.mjs'
var router = express.Router()
import {gradebook, pset, api_pset} from '../controllers/characterController.mjs'

router.get('/gradebook', redirectLogin, gradebook)
router.get('/pset/:branch/:name_pset/:type', pset)
router.post('/api_pset', api_pset)

export {router}

