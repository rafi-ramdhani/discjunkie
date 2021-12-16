const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }))

const indexRouter = require('./routes/index')
app.use(indexRouter)

const movieRouter = require('./routes/movieRouter')
app.use(movieRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})