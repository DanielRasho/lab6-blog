const express = require('express')
const Logger = require('../Logger')
const { createToken, authenticateToken } = require('../authentication')
const pool = require('../db')
const User = require('../models/user')

const signUpRouter = express.Router()

signUpRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(401).json({ message: 'Username or password not send' })
  }

  const usernameCount = (
    await pool.query('SELECT * FROM member WHERE username = $1::text', [username])
  ).rowCount

  if (usernameCount == 1) {
    res.status(401).json({ message: 'That username is already taken' })
  } else {
    await pool.query('INSERT INTO member (username, password) VALUES ( $1::text, $2::text)', [
      username,
      password,
    ])
    res.status(200).json({
      token: createToken(username, process.env.JWT_SECRET),
      message: 'Sign up successful, logging enabled.',
    })
  }
})

module.exports = signUpRouter
