const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");

const Airport = Sequelize.define(
   "airports",
   {
        id: {
         primaryKey: true,
         type: DataTypes.UUID,
         defaultValue: DataTypes.UUIDV4,
         allowNull: false, // Make sure id is not null
        },
        iata_code: {
         type: DataTypes.STRING,
         unique: true,
         allowNull: false,
        },
        name: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        city: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        country: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        latitude: {
         type: DataTypes.DECIMAL,
         allowNull: false,
        },
        longitude: {
         type: DataTypes.DECIMAL,
         allowNull: false,
        },
   },   
   {
    timestamps: false,
   }
);

module.exports = Airport;
