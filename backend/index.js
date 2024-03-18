require('dotenv').config()
const express = require('express')
const Logger = require('./src/Logger')

const app = express()
const userRouter = require('./src/routes/user')

const { PORT } = process.env

app.use('/user', userRouter)

app.listen(PORT, () => {
  Logger.info(`Server listening on port ${PORT}`, { OWO: 'sdo' })
})
