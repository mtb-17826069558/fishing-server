const User = require("../models/user");
const { success, error } = require("../utils");

exports.list = async (ctx) => {
  const list = await User.findAll({ attributes: { exclude: ["password"] } });
  success(ctx, list);
};

exports.detail = async (ctx) => {
  const user = await User.findByPk(ctx.params.id, {
    attributes: { exclude: ["password"] },
  });
  if (!user) {
    return error(ctx, "用户不存在");
  }
  success(ctx, user);
};

exports.update = async (ctx) => {
  const { phone, name, role, status, permissions } = ctx.request.body;

  if (role === 3) {
    const adminCount = await User.count({ where: { role: 3 } });
    if (adminCount >= 1 && ctx.params.id !== "1") {
      return error(ctx, "超级管理员只能有一个");
    }
  }

  const rolePermissions = {
    1: ["reservoir", "spot", "reservation"],
    2: ["reservation", "catch", "comment"],
    3: [
      "reservoir",
      "spot",
      "reservation",
      "payment",
      "catch",
      "comment",
      "role",
      "user",
    ],
  };

  const updateData = { phone, name, role, status };
  if (permissions) {
    updateData.permissions = JSON.stringify(permissions);
  } else if (role) {
    updateData.permissions = JSON.stringify(rolePermissions[role] || []);
  }

  await User.update(updateData, { where: { id: ctx.params.id } });
  success(ctx, null, "修改成功");
};

exports.delete = async (ctx) => {
  const user = await User.findByPk(ctx.params.id);

  if (!user) {
    return error(ctx, "用户不存在");
  }

  if (user.role === 3) {
    return error(ctx, "超级管理员不能删除");
  }

  await User.destroy({ where: { id: ctx.params.id } });
  success(ctx, null, "删除成功");
};

exports.enable = async (ctx) => {
  await User.update({ status: 1 }, { where: { id: ctx.params.id } });
  success(ctx, null, "启用成功");
};

exports.disable = async (ctx) => {
  const user = await User.findByPk(ctx.params.id);

  if (user.role === 3) {
    return error(ctx, "超级管理员不能禁用");
  }

  await User.update({ status: 0 }, { where: { id: ctx.params.id } });
  success(ctx, null, "禁用成功");
};
