// index.js
const fs = require("fs");
const path = require("path");
const Sequelize = require("../db/database");

const models = {};

// Read all files in the current directory
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js") // Exclude index.js
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    models[model.name] = model;
  });

// Synchronize all models
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Add this line to log the defined model attributes
console.log("Models attributes:", models);

// Export the models and Sequelize instance
module.exports = {
  ...models,
  sequelize: Sequelize,
};
