'use strict';

const fs = require('fs')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let dataInsert = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'))

    dataInsert.forEach((element) => {
      element.createdAt = new Date()
      element.updatedAt = new Date()
    })

    return queryInterface.bulkInsert("Movies", dataInsert, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Movies", null, {})
  }
};
