const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'admin',
  password: '1234',
  port: 5433,
  database: 'blogs_db',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 1000,
})

module.exports = pool
