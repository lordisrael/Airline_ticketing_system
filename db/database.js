const Sequelize = require("sequelize");
const dotenv = require("dotenv"); // Import dotenv

dotenv.config();

// const sequelize = new Sequelize(
//   process.env.POSTGRES_DB,
//   process.env.POSTGRES_USER,
//   process.env.POSTGRES_PASSWORD,
//   {
//     host: process.env.POSTGRES_HOST,
//     dialect: "postgres",
//     port: process.env.POSTGRES_PORT || 5432, 
//   }
// );

const sequelize = new Sequelize(process.env.POSTGRES_HOST, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});


sequelize
  .authenticate()
  .then(() => {
    console.log("Sequelize connection successful");
  })
  .catch((error) => {
    console.error("Connection failed", error);
  });

module.exports = sequelize;
