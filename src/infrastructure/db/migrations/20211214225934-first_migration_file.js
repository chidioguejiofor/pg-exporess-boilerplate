'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('example_sample', { 
       id: {
         type: Sequelize.STRING,
         primaryKey: true,
       },
       name: Sequelize.STRING,
       birthday: Sequelize.DATE,
       createdAt: Sequelize.DATE,
       updatedAt: Sequelize.DATE,
      });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * 
     */
     await queryInterface.dropTable('example_sample');
  }
};
