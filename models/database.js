const Pool = require('pg').Pool

//configs
const {POSTGRES_USER, POSTGRES_HOST, POSTGRES_DATABASE_NAME, POSTGRES_PASSWORD, POSTGRES_PORT} = process.env

const pool = new Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE_NAME,
    port: Number(POSTGRES_PORT)
})

module.exports = pool