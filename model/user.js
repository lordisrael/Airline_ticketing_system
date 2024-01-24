const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");
const bcrypt = require("bcryptjs");

const User = Sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false, // Make sure id is not null
    },
    title: {
      type: DataTypes.ENUM("Mr", "Mrs", "Miss", "Ms"), // Use ENUM for enumerated values
      allowNull: false,
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
      type: DataTypes.DATE, // Assuming date of birth is stored as a date
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING, // Assuming password is stored as a string
    },
    mobile: {
      type: DataTypes.STRING, // Assuming mobile is stored as a string
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user, options) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

Sequelize.sync({ force: false })
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table: ", error);
  });

module.exports = User;
