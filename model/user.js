const { DataTypes } = require("sequelize");
const Sequelize = require("../db/database");
const bcrypt = require('bcryptjs')


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
      type: DataTypes.ENUM("Mr", "Mrs", "Miss", "Ms"),
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
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming password is stored as a string
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false, // Assuming mobile is stored as a string
    },
    refreshToken: {
      type: DataTypes.STRING,
    }
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

module.exports = User;
