const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Reservoir = sequelize.define("reservoir", {
  name: DataTypes.STRING,
  operator_id: DataTypes.INTEGER,
  location: DataTypes.STRING,
  area: DataTypes.DECIMAL(10,2),
  depth_range: DataTypes.STRING,
  fish_types: DataTypes.STRING,
  facility: DataTypes.TEXT,
  rules: DataTypes.TEXT,
  status: { type: DataTypes.TINYINT, defaultValue: 1 }
});

module.exports = Reservoir;