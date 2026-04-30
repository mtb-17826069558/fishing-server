const { success } = require("../utils");

const permissions = [
  { code: "reservoir", name: "鱼塘管理" },
  { code: "spot", name: "钓位管理" },
  { code: "reservation", name: "预约管理" },
  { code: "payment", name: "支付管理" },
  { code: "catch", name: "渔获管理" },
  { code: "comment", name: "评论管理" },
  { code: "role", name: "角色管理" },
  { code: "user", name: "人员管理" }
];

const roles = [
  { code: 1, name: "运营人员", permissions: ["reservoir", "spot", "reservation"] },
  { code: 2, name: "钓友", permissions: ["reservation", "catch", "comment"] },
  { code: 3, name: "超级管理员", permissions: ["reservoir", "spot", "reservation", "payment", "catch", "comment", "role", "user"] }
];

exports.list = async (ctx) => {
  success(ctx, permissions);
};

exports.roles = async (ctx) => {
  success(ctx, roles);
};

exports.userPermissions = async (ctx) => {
  success(ctx, {
    permissions: ctx.user.permissions,
    role: ctx.user.role
  });
};