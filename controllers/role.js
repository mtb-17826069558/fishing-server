const Role = require("../models/role");
const { success, error } = require("../utils");

exports.create = async (ctx) => {
  const { name, description, permissions } = ctx.request.body;
  
  if (!name) {
    return error(ctx, "角色名称为必填字段");
  }
  
  const role = await Role.create({ name, description, permissions });
  success(ctx, role);
};

exports.list = async (ctx) => {
  const list = await Role.findAll();
  success(ctx, list);
};

exports.update = async (ctx) => {
  const { name, description, permissions, status } = ctx.request.body;
  
  if (!name) {
    return error(ctx, "角色名称为必填字段");
  }
  
  await Role.update({ name, description, permissions, status }, { where: { id: ctx.params.id } });
  success(ctx, null, "修改成功");
};

exports.delete = async (ctx) => {
  await Role.destroy({ where: { id: ctx.params.id } });
  success(ctx, null, "删除成功");
};

exports.detail = async (ctx) => {
  const role = await Role.findByPk(ctx.params.id);
  if (!role) {
    return error(ctx, "角色不存在");
  }
  success(ctx, role);
};