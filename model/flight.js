// models/Flight.js
const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");

const Flight = Sequelize.define(
  "Flight",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    airline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureAirport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrivalAirport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    arrivalDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "On Time", "Delayed", "Cancelled"),
      allowNull: false,
      defaultValue: "Scheduled",
    },
    DepartureDateTime: {
      type: DataTypes.DATE,
    },
    ArrivalDateTime: {
      type: DataTypes.DATE,
    },
    aircraft: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availableSeats: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        economy: 0,
        business: 0,
        firstClass: 0,
      },
    },
    flightDuration: {
      type: DataTypes.INTEGER, // Duration in minutes
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    // Add other flight-related attributes here
  },
  {
    timestamps: true,
  }
);

module.exports = Flight;
