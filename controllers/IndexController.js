const { Movie, Genre, MovieGenre, Detail, User } = require('../models')
const formatPrice = require('../helpers/formatPrice')

class IndexController {

  static randomMovie(req, res) {
    Movie.findAll({
      include: {
        model: Genre
      }
    })
      .then(data => {
        let randomMovies = []

        for (let i = 0; i < 4; i++) {
          let random = Math.floor(Math.random() * data.length)

          randomMovies.push(data[random])
        }

        res.render('home', { randomMovies, formatPrice, logged: req.session.user })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = IndexController