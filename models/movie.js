'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Movie.belongsTo(models.User)
      Movie.hasOne(models.Detail)
      Movie.belongsToMany(models.Genre, { through: models.MovieGenre })
    }

    static scopeNotAvailable(where) {
      return Movie.findAll(where)
    }
  };
  Movie.init({
    // title: DataTypes.STRING,
    // price: DataTypes.INTEGER,
    // stock: DataTypes.INTEGER,
    // format: DataTypes.STRING,
    // imgUrl: DataTypes.STRING,
    // UserId: DataTypes.INTEGER
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Price cannot be empty'
        },
        min: {
          msg: 'Minimum price is Rp. 50.000,00',
          args: 50000
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Stock cannot be empty'
        },
        min: {
          msg: 'Minimum stock is 5',
          args: 5
        }
      }
    },
    format: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please choose disc format'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Image URL cannot be empty'
        },
        isUrl: {
          msg: 'URL is not valid'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        instance.UserId = 1
      }
    },
    modelName: 'Movie',
  });
  return Movie;
};