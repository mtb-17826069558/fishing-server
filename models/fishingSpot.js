const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const FishingSpot = sequelize.define("fishing_spot", {
  reservoir_id: DataTypes.INTEGER,
  spot_num: DataTypes.STRING,
  price: DataTypes.DECIMAL(10,2),
  status: { type: DataTypes.TINYINT, defaultValue: 1 }
});

module.exports = FishingSpot;