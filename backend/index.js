require('dotenv').config()
const express = require('express')
const Logger = require('./src/Logger')

const app = express()
const userRouter = require('./src/routes/user')
const loginRouter = require('./src/routes/login')

const { PORT } = process.env

app.use(express.json())
app.use('/user', userRouter)
app.use('/login', loginRouter)

app.listen(PORT, () => {
  Logger.info(`Server listening on port ${PORT}`)
})
