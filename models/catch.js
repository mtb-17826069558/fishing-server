const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Catch = sequelize.define("catch", {
  user_id: DataTypes.INTEGER,
  reservoir_id: DataTypes.INTEGER,
  fish_type: DataTypes.STRING,
  weight: DataTypes.DECIMAL(5,2),
  images: DataTypes.STRING,
  recycle_status: { type: DataTypes.TINYINT, defaultValue: 0 }
});

module.exports = Catch;