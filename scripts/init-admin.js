const sequelize = require("../config/db");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("数据库连接成功");

    await sequelize.sync();
    console.log("数据表同步完成");

    const adminPermissions = JSON.stringify([
      "reservoir",
      "spot",
      "reservation",
      "payment",
      "catch",
      "comment",
      "role",
      "user",
    ]);

    const [admin, created] = await User.findOrCreate({
      where: { phone: "17826069558" },
      defaults: {
        password: "admin123",
        name: "超级管理员",
        role: 3,
        permissions: adminPermissions,
      },
    });

    if (created) {
      console.log("超级管理员账号创建成功");
    } else {
      console.log("超级管理员账号已存在，正在更新密码和权限...");
      admin.password = await bcrypt.hash("admin123", 10);
      admin.permissions = adminPermissions;
      await admin.save();
    }

    console.log("");
    console.log("=== 超级管理员账号 ===");
    console.log("手机号: 13800138000");
    console.log("密码: admin123");
    console.log("角色: 超级管理员");
    console.log(
      "权限: reservoir, spot, reservation, payment, catch, comment, role, user",
    );
    console.log("========================");

    process.exit(0);
  } catch (error) {
    console.error("创建管理员失败:", error.message);
    process.exit(1);
  }
};

createAdmin();
