const express = require('express')

const userRouter = express.Router()

userRouter.get('/', (req, res) => {
  console.log('hello')
})

module.exports = userRouter
