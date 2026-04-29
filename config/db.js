const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("fishing_db", "root", "123456", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  timezone: "+08:00",
  logging: false
});

module.exports = sequelize;