const FishingSpot = require("../models/fishingSpot");
const service = require("../services/spot");
const { success, error } = require("../utils");

exports.create = async (ctx) => {
  const { spot_num, price } = ctx.request.body;
  
  if (!spot_num || !price) {
    return error(ctx, "钓位编号和价格为必填字段");
  }
  
  const data = await service.create({ ...ctx.request.body, reservoir_id: ctx.params.id });
  success(ctx, data);
};

exports.list = async (ctx) => {
  const list = await service.listByReservoir(ctx.params.id);
  success(ctx, list);
};

exports.update = async (ctx) => {
  const { spot_num, price, status } = ctx.request.body;
  
  if (!spot_num || !price) {
    return error(ctx, "钓位编号和价格为必填字段");
  }
  
  await FishingSpot.update({ spot_num, price, status }, { where: { id: ctx.params.id } });
  success(ctx, null, "修改成功");
};

exports.delete = async (ctx) => {
  await FishingSpot.destroy({ where: { id: ctx.params.id } });
  success(ctx, null, "删除成功");
};