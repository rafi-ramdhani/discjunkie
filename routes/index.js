const express = require('express')
const IndexController = require('../controllers/IndexController')
const indexRouter = express.Router()

indexRouter.get('/', IndexController.randomMovie)

module.exports = indexRouter
