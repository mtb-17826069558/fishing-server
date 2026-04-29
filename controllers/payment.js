const service = require("../services/payment");
const { success } = require("../utils");

exports.create = async (ctx) => {
  const { reservation_id, amount } = ctx.request.body;
  const data = await service.create(reservation_id, amount);
  success(ctx, data);
};

exports.statistics = async (ctx) => {
  const { start, end } = ctx.query;
  const total = await service.statistics(start, end);
  success(ctx, { total });
};