const express = require('express')
const movieRouter = express.Router()
const MovieController = require('../controllers/MovieController')

movieRouter.get('/movies', MovieController.movieList)
movieRouter.get('/movies/add', MovieController.addForm)
movieRouter.post('/movies/add', MovieController.addMovie)
movieRouter.get('/movies/:movieId', MovieController.movieDetail)
movieRouter.get('/movies/:movieId/delete', MovieController.deleteMovie)
movieRouter.get('/movies/:movieId/edit', MovieController.editForm)
movieRouter.post('/movies/:movieId/edit', MovieController.editMovie)

module.exports = movieRouter
