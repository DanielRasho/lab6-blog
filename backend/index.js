require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require('./src/routes/user')

const PORT = process.env.PORT

app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log('Server listening')
})
