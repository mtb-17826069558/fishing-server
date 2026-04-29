const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Comment = sequelize.define("comment", {
  user_id: DataTypes.INTEGER,
  reservoir_id: DataTypes.INTEGER,
  content: DataTypes.TEXT,
  score: DataTypes.TINYINT
});

module.exports = Comment;