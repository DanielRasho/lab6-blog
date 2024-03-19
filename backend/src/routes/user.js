const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const pool = require('../db')
const User = require('../models/user')

const userRouter = express.Router()

userRouter.get('/', authenticateToken, async (req, res) => {
  const DBData = await pool.query(
    'SELECT username, password FROM member WHERE username = $1::text',
    [req.user]
  )
  const { username, password } = DBData.rows[0]
  res.status(200).json({ username: username, password: password })
})

module.exports = userRouter
