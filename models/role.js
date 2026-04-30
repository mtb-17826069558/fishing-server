const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Role = sequelize.define("role", {
  name: { type: DataTypes.STRING, unique: true },
  description: DataTypes.STRING,
  permissions: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  status: { type: DataTypes.TINYINT, defaultValue: 1 },
});

module.exports = Role;
