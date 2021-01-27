require('dotenv').config()
const {deleteRepo} = require('./helper.js')

deleteRepo(process.env.TSPU_TOKEN, 'vadimgb1')
