const Sequelize = require("sequelize");
const dataBaseConfig = require("../config/database");
const sequelize = new Sequelize(dataBaseConfig);

const Teacher = require("../models/Teacher")(sequelize, Sequelize);

const models = { TeacherModel: Teacher };

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
