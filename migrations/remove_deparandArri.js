"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Flights", "DepartureDateTime");
    await queryInterface.removeColumn("Flights", "ArrivalDateTime");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Flights", "DepartureDateTime", {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn("Flights", "ArrivalDateTime", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
