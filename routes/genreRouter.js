const express = require('express')
const genreRouter = express.Router()
const GenreController = require('../controllers/GenreController')

genreRouter.get('/genres', GenreController.genreList)

module.exports = genreRouter
