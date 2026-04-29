const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("role", {
  name: { type: DataTypes.STRING, unique: true },
  description: DataTypes.STRING,
  permissions: DataTypes.TEXT,
  status: { type: DataTypes.TINYINT, defaultValue: 1 }
});

module.exports = Role;