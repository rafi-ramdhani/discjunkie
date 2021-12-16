'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detail.belongsTo(models.Movie)
    }
  };
  Detail.init({
    // directorName: DataTypes.STRING,
    // yearReleased: DataTypes.STRING,
    // rating: DataTypes.DECIMAL,
    // sinopsis: DataTypes.STRING,
    // MovieId: DataTypes.INTEGER
    directorName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Director cannot be empty'
        }
      }
    },
    yearReleased: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Release Year cannot be empty'
        },
        min: {
          msg: 'Release cannot be zero/negative',
          args: 1
        }
      }
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: 'Rating cannot be empty'
        },
        min: {
          msg: 'Minimum rating is 1',
          args: 1
        },
        max: {
          msg: 'Maximum rating is 10',
          args: 10
        }
      }
    },
    sinopsis: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Synopsis cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};