const service = require("../services/catch");
const { success } = require("../utils");

exports.create = async (ctx) => {
  const data = await service.create(ctx.request.body, ctx.user.id);
  success(ctx, data);
};

exports.recycle = async (ctx) => {
  await service.recycle(ctx.params.id);
  success(ctx, null, "申请回收成功");
};