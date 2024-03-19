const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const { pool } = require('../db')
const User = require('../models/user')

const loginRouter = express.Router()

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const DBData = await pool.query('SELECT password FROM member WHERE username = $1::text', [
    username,
  ])

  const DBpassword = DBData.rows[0].password

  if (!username || !password) {
    res.status(401).json({ message: 'Username or password not send' })
  } else if (DBpassword != password) {
    res.status(401).json({ message: 'Invalid username or password ' })
  } else {
    res.status(200).json({
      token: createToken(username, process.env.JWT_SECRET),
      message: 'Login successfull',
    })
  }
})

module.exports = loginRouter
