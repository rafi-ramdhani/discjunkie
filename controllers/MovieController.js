const Genre = require("../models/genre")


class MovieController {

  static addForm(req, res) {
    Genre.findAll()
      .then(data => {
        res.render('addForm', { data })
      })
      .catch(err => {
        res.send(err)
      })
  }

  static addMovie(req, res) {
    let { } = req.body

    Movie.create(value)
      .then(data => {
        return Movie.findAll()
      })
      .then(data => {
        let MovieIdIndex = data.length - 1
        let MovieIdLatest = data[MovieIdIndex].id

        MovieGenre.create({
          MovieId: MovieIdLatest,
          GenreId: req.body.GenreId
        })

        res.redirect('')
      })
      .catch(err => {
        res.send(err)
      })
  }

}