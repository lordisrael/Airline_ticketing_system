// models/Price.js
const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");
const Flight = require("./flight"); // Import the Flight model

const Price = Sequelize.define(
  "Price",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    flightId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Flight,
        key: "id",
        onDelete: "CASCADE", // If the associated Flight record is deleted, also delete the Price record
      },
    },
    economy: {
      type: DataTypes.DECIMAL(10, 2),
    },
    business: {
      type: DataTypes.DECIMAL(10, 2),
    },
    firstClass: {
      type: DataTypes.DECIMAL(10, 2),
    },
    // Additional attributes related to pricing
  },
  {
    timestamps: true,
  }
);

// Define the association
Price.belongsTo(Flight, { foreignKey: "flightId" });

module.exports = Price;
