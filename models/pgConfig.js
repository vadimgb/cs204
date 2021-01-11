require("dotenv").config()
const {Pool} = require("pg")


const pool = new Pool({connectionString: process.env.URI,
	    ssl: { rejectUnauthorized: false}
})

module.exports.pool = pool 
