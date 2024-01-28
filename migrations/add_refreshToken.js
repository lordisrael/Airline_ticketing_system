"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "refreshToken", {
      type: Sequelize.STRING,
      allowNull: false, // or false, depending on your requirement
      defaultValue: " ",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "refreshToken");
  },
};
