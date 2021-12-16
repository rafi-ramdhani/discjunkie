const { Movie, Genre, MovieGenre, Detail, User } = require('../models')
const Sequelize = require('sequelize')

class MovieController {

  static movieList(req, res) {
    let where

    if (req.query.sortBy) {

    }

    Movie.findAll({
      include: {
        model: Genre
      }
    })
      .then(data => {
        res.render('movieList', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static movieDetail(req, res) {
    Movie.findByPk(req.params.id, {
      include: {
        model: Genre
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  }

  // static addForm(req, res) {
  //   Genre.findAll()
  //     .then(data => {
  //       res.render('addForm', { data })
  //     })
  //     .catch(err => {
  //       res.send(err)
  //     })
  // }

  // static addMovie(req, res) {
  //   let { } = req.body

  //   Movie.create(value)
  //     .then(data => {
  //       return Movie.findAll()
  //     })
  //     .then(data => {
  //       let MovieIdIndex = data.length - 1
  //       let MovieIdLatest = data[MovieIdIndex].id

  //       MovieGenre.create({
  //         MovieId: MovieIdLatest,
  //         GenreId: req.body.GenreId
  //       })

  //       res.redirect('')
  //     })
  //     .catch(err => {
  //       res.send(err)
  //     })
  // }

}

module.exports = MovieController