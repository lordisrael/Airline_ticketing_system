'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "createdAt");
    await queryInterface.removeColumn("users", "updatedAt");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });

    await queryInterface.addColumn("users", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
  },
};



