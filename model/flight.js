// models/Flight.js
const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");
const Airport = require('./airport')

const Flight = Sequelize.define(
  "Flight",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departureAirport: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Airport,
        key: "id",
      },
    },
    arrivalAirport: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Airport,
        key: "id",
      },
    },
    departureDateTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPast: function (value) {
          // Custom validation to check if the date is in the past
          if (new Date(value).getTime() <= new Date().getTime()) {
            throw new Error("Departure date must be in the future.");
          }
        },
        isDate: {
          args: true,
          msg: "Invalid date format",
        },
      },
      get() {
        // Format date-time when retrieving
        const arrivalDateTime = this.getDataValue("departureDateTime");
        return arrivalDateTime ? formatDate(arrivalDateTime) : null;
      },
    },
    arrivalDateTime: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isPast: function (value) {
          // Custom validation to check if the date is in the past
          if (new Date(value).getTime() <= new Date().getTime()) {
            throw new Error("Arrival date must be in the future.");
          }
        },
        isDate: {
          args: true,
          msg: "Invalid date format",
        },
      },
      get() {
        // Format date-time when retrieving
        const arrivalDateTime = this.getDataValue("arrivalDateTime");
        return arrivalDateTime ? formatDate(arrivalDateTime) : null;
      },
    },
    status: {
      type: DataTypes.ENUM("Scheduled", "On Time", "Delayed", "Cancelled"),
      allowNull: false,
      defaultValue: "Scheduled",
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
      validate: {
        isPositive: function (value) {
          if (value <= 0) {
            throw new Error(
              "Flight duration must be a positive number of minutes."
            );
          }
        },
      },
      get() {
        // Format flight duration when retrieving
        const flightDuration = this.getDataValue("flightDuration");
        return flightDuration ? formatFlightDuration(flightDuration) : null;
      },
    },
    remarks: {
      type: DataTypes.TEXT,
    },
    // Add other flight-related attributes here
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (flight) => {
        // Calculate and set flight duration before saving
        if (flight.departureDateTime && flight.arrivalDateTime) {
          const departureTime = new Date(flight.departureDateTime).getTime();
          const arrivalTime = new Date(flight.arrivalDateTime).getTime();
          const durationInMinutes = Math.floor((arrivalTime - departureTime) / (1000 * 60));

          flight.flightDuration = durationInMinutes;
        }
      },
    },
  }
);

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

function formatFlightDuration(durationInMinutes) {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const hoursString = hours > 0 ? `${hours} Hour${hours > 1 ? "s" : ""}` : "";
  const minutesString =
    minutes > 0 ? ` ${minutes} Minute${minutes > 1 ? "s" : ""}` : "";

  return `${hoursString}${minutesString}`;
}

Flight.belongsTo(Airport, {
  foreignKey: "departureAirport",
});
Flight.belongsTo(Airport, {
  foreignKey: "arrivalAirport",
});

module.exports = Flight;
