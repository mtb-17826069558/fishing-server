const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Reservation = sequelize.define("reservation", {
  user_id: DataTypes.INTEGER,
  spot_id: DataTypes.INTEGER,
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
  pay_status: { type: DataTypes.TINYINT, defaultValue: 0 },
  verify_status: { type: DataTypes.TINYINT, defaultValue: 0 }
});

module.exports = Reservation;