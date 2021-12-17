const express = require('express')
const app = express()
const session = require('express-session')
const port = 3000

const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

const indexRouter = require('./routes/index')
app.use(indexRouter)

const movieRouter = require('./routes/movieRouter')
app.use(movieRouter)

const userRouter = require('./routes/userRouter')
app.use(userRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})