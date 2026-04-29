const Reservoir = require("../models/reservoir");
const service = require("../services/reservoir");
const { success, error } = require("../utils");

exports.create = async (ctx) => {
  const { name, location } = ctx.request.body;
  
  if (!name || !location) {
    return error(ctx, "名称和位置为必填字段");
  }
  
  const data = await service.create(ctx.request.body, ctx.user.id);
  success(ctx, data);
};

exports.myList = async (ctx) => {
  const list = await service.myList(ctx.user.id);
  success(ctx, list);
};

exports.update = async (ctx) => {
  const { name, location } = ctx.request.body;
  
  if (!name || !location) {
    return error(ctx, "名称和位置为必填字段");
  }
  
  await Reservoir.update(ctx.request.body, { where: { id: ctx.params.id } });
  success(ctx, null, "修改成功");
};

exports.delete = async (ctx) => {
  await Reservoir.destroy({ where: { id: ctx.params.id } });
  success(ctx, null, "删除成功");
};
