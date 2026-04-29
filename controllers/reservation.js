const service = require("../services/reservation");
const { success, error } = require("../utils");

exports.create = async (ctx) => {
  try {
    const data = await service.create(ctx.request.body, ctx.user.id);
    success(ctx, data);
  } catch (e) {
    error(ctx, e.message);
  }
};

exports.verify = async (ctx) => {
  await service.verify(ctx.params.id);
  success(ctx, null, "核销成功");
};