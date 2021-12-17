const { Movie, Genre, MovieGenre, Detail, User } = require('../models')
const bcrypt = require('bcryptjs')
const register = require('../helpers/register')
const sendMail = require('../helpers/sendMail')

class UserController {

  static registerForm(req, res) {
    res.render('registerForm', { logged: req.session.user })
  }

  static postRegister(req, res) {
    const { username, email, password } = req.body

    User.create({ username, email, password, role: 'user' })
      .then(data => {
        res.redirect('/login')
      })
      .catch(err => {
        res.send(err.errors.map(element => element.message))
      })
  }

  static loginForm(req, res) {
    const { error } = req.query

    res.render('loginForm', { error, logged: req.session.user })
  }

  static postLogin(req, res) {
    const { username, password } = req.body

    User.findOne({
      where: {
        username
      }
    })
      .then(data => {
        if (data) {
          const isValidPassword = bcrypt.compareSync(password, data.password)

          if (isValidPassword) {

            req.session.user = { id: data.id, role: data.role, username: data.username, email: data.email }

            return res.redirect('/')
          } else {
            const error = 'Invalid username/password'

            return res.redirect(`/login?error=${error}`)
          }
        } else {
          const error = 'Invalid username/password'

          return res.redirect(`/login?error=${error}`)
        }
      })
      .catch(err => {
        res.send(err)
      })
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        res.send(err)
      } else {
        res.redirect('/login')
      }
    })
  }

}

module.exports = UserController