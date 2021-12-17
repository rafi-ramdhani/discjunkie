const express = require('express')
const UserController = require('../controllers/UserController')
const userRouter = express.Router()

userRouter.get('/register', UserController.registerForm)
userRouter.post('/register', UserController.postRegister)

userRouter.get('/login', UserController.loginForm)
userRouter.post('/login', UserController.postLogin)

userRouter.get('/logout', UserController.logout)

module.exports = userRouter
