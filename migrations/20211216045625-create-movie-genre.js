'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MovieGenres', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      MovieId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Movies"
          },
          key: "id",
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      GenreId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Genres"
          },
          key: "id",
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MovieGenres');
  }
};