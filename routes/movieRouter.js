const express = require('express')
const movieRouter = express.Router()
const MovieController = require('../controllers/MovieController')

movieRouter.get('/movies', MovieController.movieList)
movieRouter.get('/movies/:movieId', MovieController.movieDetail)

module.exports = movieRouter
