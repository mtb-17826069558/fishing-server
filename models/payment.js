const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Payment = sequelize.define("payment", {
  reservation_id: DataTypes.INTEGER,
  amount: DataTypes.DECIMAL(10,2),
  pay_type: DataTypes.STRING
});

module.exports = Payment;