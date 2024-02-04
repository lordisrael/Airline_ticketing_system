const {DataTypes} = require("sequelize")
const Sequelize = require("../db/database")

const Passenger = Sequelize.define("passengers", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false, // Make sure id is not null
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  dob: {
    type: DataTypes.DATE,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.ENUM("Mr", "Mrs", "Miss", "Ms"),
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM("Male", "Female"),
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false, // Assuming mobile is stored as a string
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  priceId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Price,
      key: "id",
      onDelete: "CASCADE",
    },
  },
});

// Define the association
Passenger.belongsTo(Price, { foreignKey: "priceId" });

module.exports = Passenger