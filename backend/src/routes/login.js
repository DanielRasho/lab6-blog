const express = require('express')
const Logger = require('../Logger')

const loginRouter = express.Router()

loginRouter.post('/', (req, res) => {
  console.log(req.body)
  Logger.info('User registering', { request: req.body })
  res.status(200).json({ message: 'User registered ' })
})

module.exports = loginRouter
