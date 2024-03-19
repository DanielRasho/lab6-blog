require('dotenv').config()
const express = require('express')
const Logger = require('./src/Logger')

const app = express()
const userRouter = require('./src/routes/user')
const loginRouter = require('./src/routes/login')
const signUpRouter = require('./src/routes/signup')

const { PORT } = process.env

// Setting a interceptor for res.send function
// So that app can log any request and response operated.
const loggerMiddleware = (req, res, next) => {
  const originalSend = res.send

  res.send = function (body) {
    Logger.info({ 
      request: { method: req.method, url: req.originalUrl, body: req.body },
      response: { status: res.statusCode , body }
    })
    
    originalSend.call(this, body);
  }
  
  next()
}

app.use(express.json())
app.use(loggerMiddleware) // <- Using logger interceptor
app.use('/user', userRouter)
app.use('/login', loginRouter)
app.use('/signUp', signUpRouter)

app.listen(PORT, () => {
  Logger.info(`Server listening on port ${PORT}`)
})
