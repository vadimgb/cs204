#!/usr/bin/env node
import dotenv from 'dotenv'
dotenv.config()


const tspu_token = process.env.TSPU_TOKEN
const PORT = process.env.PORT || 8000

import {app} from '../app.mjs'


app.listen(PORT, ()=>console.log(`listen PORT:${PORT}`))
