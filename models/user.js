const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

const User = sequelize.define("user", {
  phone: { type: DataTypes.STRING(11), unique: true },
  password: DataTypes.STRING,
  name: DataTypes.STRING,
  role: { type: DataTypes.TINYINT, comment: "1运营 2钓友 3管理员" },
  permissions: { type: DataTypes.TEXT, comment: "权限列表JSON" },
  avatar: DataTypes.STRING,
  status: { type: DataTypes.TINYINT, defaultValue: 1 }
});

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
  
  if (!user.permissions) {
    const rolePermissions = {
      1: ["reservoir", "spot", "reservation"],
      2: ["reservation", "catch", "comment"],
      3: ["reservoir", "spot", "reservation", "payment", "catch", "comment", "role", "user"]
    };
    user.permissions = JSON.stringify(rolePermissions[user.role] || []);
  }
});

module.exports = User;