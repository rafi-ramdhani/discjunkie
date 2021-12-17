'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Movie)
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'username tidak boleh kosong'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'email tidak boleh kosong'
        },
        isEmail: {
          msg: 'format email tidak valid'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'password tidak boleh kosong'
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks: {
      beforeCreate: (instance, options) => {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);

        instance.password = hash
      }
    },
    modelName: 'User',
  });
  return User;
};