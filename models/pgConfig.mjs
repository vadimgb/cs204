import dotenv from "dotenv"
dotenv.config()

import pg from "pg"


const pool = new pg.Pool({connectionString: process.env.DATABASE_URL,
	    ssl: { rejectUnauthorized: false}
})

console.log(process.env.DATABASE_URL)
export {pool}
