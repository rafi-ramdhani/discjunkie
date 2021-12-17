const express = require('express')
const movieRouter = express.Router()
const MovieController = require('../controllers/MovieController')

const userRouter = require('./userRouter')
movieRouter.use(userRouter)

movieRouter.use(function (req, res, next) {
  if (!req.session.user.id) {
    const error = 'Please login first'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})

movieRouter.get('/movies', MovieController.movieList)
movieRouter.get('/movies/filler/:movieId', MovieController.movieDetail)
movieRouter.get('/movies/filler/:movieId/cart', MovieController.buy)

movieRouter.use(function (req, res, next) {
  if (req.session.user.role === 'admin' && req.session.user.id) {
    next()
  } else {
    const error = 'You have no access'
    res.redirect(`/movies?error=${error}`)
  }
})

movieRouter.get('/movies/add', MovieController.addForm)
movieRouter.post('/movies/add', MovieController.addMovie)
movieRouter.get('/movies/filler/:movieId/cart', MovieController.buy)
movieRouter.get('/movies/filler/:movieId', MovieController.movieDetail)
movieRouter.get('/movies/filler/:movieId/delete', MovieController.deleteMovie)
movieRouter.get('/movies/filler/:movieId/edit', MovieController.editForm)
movieRouter.post('/movies/filler/:movieId/edit', MovieController.editMovie)

module.exports = movieRouter
