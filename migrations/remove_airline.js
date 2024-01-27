// migrations/<timestamp>-remove_airline_from_flight.js

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Flights", "airline");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Flights", "airline", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
