const { Movie, Genre, MovieGenre, Detail, User } = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const formatPrice = require('../helpers/formatPrice')
const sendMail = require('../helpers/sendMail')

class MovieController {

  static movieList(req, res) {
    let where = {
      include: {
        model: Genre
      },
      where: {
        stock: {
          [Op.gte]: 1
        }
      }
    }

    if (req.query.search && req.query.sortBy) {
      if (req.query.sortBy === 'most-expensive') {
        where.where['title'] = {
          [Op.iLike]: `%${req.query.search}%`
        }
        where.order = [['price', 'DESC']]
      } else if (req.query.sortBy === 'cheapest') {
        where.where['title'] = {
          [Op.iLike]: `%${req.query.search}%`
        }
        where.order = [['price', 'ASC']]
      }
    } else if (req.query.search && !req.query.sortBy) {
      where.where['title'] = {
        [Op.iLike]: `%${req.query.search}%`
      }
    } else if (!req.query.search && req.query.sortBy) {
      if (req.query.sortBy === 'most-expensive') {
        where.order = [['price', 'DESC']]
      } else if (req.query.sortBy === 'cheapest') {
        where.order = [['price', 'ASC']]
      }
    }

    Movie.scopeNotAvailable(where)
      .then(data => {
        console.log(req.session)

        let admin = req.session.user.role === 'admin'

        res.render('movieList', { data, formatPrice, error: req.query.error, logged: req.session.user, admin })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static movieDetail(req, res) {
    let movieGenre

    Movie.findByPk(req.params.movieId, {
      include: {
        model: Genre
      }
    })
      .then(data => {
        movieGenre = data

        return Movie.findByPk(req.params.movieId, {
          include: {
            model: Detail
          }
        })
      })
      .then(data => {
        let admin = req.session.user.role === 'admin'
        res.render('movieDetail', { data, genres: movieGenre.Genres, formatPrice, logged: req.session.user, admin })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addForm(req, res) {
    res.render('addForm', { logged: req.session.user })
  }

  static addMovie(req, res) {
    let { title, price, stock, format, imgUrl, action, comedy, drama, fantasy, horror,
      directorName, sinopsis, yearReleased, rating } = req.body
    let MovieIdIndex
    let MovieIdLatest
    let genreCounter = 0
    let genre = []

    Movie.create({
      title: title,
      price: price,
      stock: stock,
      format: format,
      imgUrl: imgUrl
    })
      .then(data => {
        return Movie.findAll()
      })
      .then(data => {
        MovieIdIndex = data.length - 1
        MovieIdLatest = data[MovieIdIndex].id

        if (action) {
          genreCounter++
          genre.push(action)
        }

        if (comedy) {
          genreCounter++
          genre.push(comedy)
        }

        if (drama) {
          genreCounter++
          genre.push(drama)
        }

        if (fantasy) {
          genreCounter++
          genre.push(fantasy)
        }

        if (horror) {
          genreCounter++
          genre.push(horror)
        }

        return Genre.findAll()
      })
      .then(data => {
        Detail.create({
          directorName: directorName,
          sinopsis: sinopsis,
          yearReleased: yearReleased,
          rating: rating,
          MovieId: MovieIdLatest
        })

        for (let i = 0; i < data.length - 1; i++) {
          let genreId = data[i].id
          let genre_name = data[i].genreName

          if (genre.includes(genre_name)) {
            MovieGenre.create({
              MovieId: MovieIdLatest,
              GenreId: genreId
            })
          }
        }

        res.redirect('/movies')
      })
      .catch(err => {
        res.send(err.errors.map(element => element.message))
      })
  }

  static deleteMovie(req, res) {
    let movie

    Movie.findByPk(req.params.movieId)
      .then(data => {
        movie = data

        return Detail.findAll({
          where: {
            MovieId: movie.id
          }
        })
      })
      .then(data => {
        data[0].destroy()

        return MovieGenre.findAll({
          where: {
            MovieId: movie.id
          }
        })
      })
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          data[i].destroy()
        }

        movie.destroy()

        res.redirect('/movies')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editForm(req, res) {
    let movie

    Movie.findByPk(req.params.movieId, {
      include: {
        model: Detail
      }
    })
      .then(data => {
        movie = data

        return MovieGenre.findAll({
          where: {
            MovieId: data.id
          }
        })
      })
      .then(data => {
        res.render('editForm', { data, movie, logged: req.session.user })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static editMovie(req, res) {
    let { title, price, stock, format, imgUrl, action, comedy, drama, fantasy, horror,
      directorName, sinopsis, yearReleased, rating } = req.body
    let MovieIdIndex
    let MovieIdLatest
    let genreCounter = 0
    let genre = []
    let prevId = []


    MovieGenre.findAll({
      where: {
        MovieId: req.params.movieId
      }
    })
      .then(data => {
        data.forEach((element) => {
          prevId.push([element.MovieId, element.GenreId])
        })

        Movie.update({
          title: title,
          price: price,
          stock: stock,
          format: format,
          imgUrl: imgUrl,
          updatedAt: new Date()
        }, {
          where: {
            id: req.params.movieId
          }
        })
      })
      .then(data => {
        return Movie.findAll()
      })
      .then(data => {
        MovieIdIndex = data.length - 1
        MovieIdLatest = data[MovieIdIndex].id

        if (action) {
          genreCounter++
          genre.push(action)
        }

        if (comedy) {
          genreCounter++
          genre.push(comedy)
        }

        if (drama) {
          genreCounter++
          genre.push(drama)
        }

        if (fantasy) {
          genreCounter++
          genre.push(fantasy)
        }

        if (horror) {
          genreCounter++
          genre.push(horror)
        }

        return Genre.findAll()
      })
      .then(data => {
        console.log(genreCounter)
        Detail.update({
          directorName: directorName,
          sinopsis: sinopsis,
          yearReleased: yearReleased,
          rating: rating,
          MovieId: req.params.movieId
        }, {
          where: {
            id: req.params.movieId
          }
        })


        for (let i = 0; i < data.length - 1; i++) {
          let genreId = data[i].id
          let genre_name = data[i].genreName

          if (genre.includes(genre_name)) {
            MovieGenre.create({
              MovieId: req.params.movieId,
              GenreId: genreId
            })
          }
        }

        for (let i = 0; i <= prevId.length - 1; i++) {
          MovieGenre.destroy({
            where: {
              MovieId: prevId[i][0],
              GenreId: prevId[i][1]
            }
          })
        }

        res.redirect('/movies')
      })
      .catch(err => {
        res.send(err)
      })
  }

  static buy(req, res) {
    Movie.decrement('stock', {
      where: {
        id: req.params.movieId
      }
    })
      .then(data => {
        return Movie.findByPk(req.params.movieId)
      })
      .then(data => {
        let admin = req.session.user.role === 'admin'

        res.render('thanks', { data, admin, logged: req.session.user })
      })
      .catch(err => {
        res.send(err)
      })
  }

}

module.exports = MovieController