exports.success = (ctx, data = {}, msg = "成功") => {
  ctx.body = { code: 200, msg, data };
};

exports.error = (ctx, msg = "失败", code = 400) => {
  ctx.body = { code, msg, data: null };
};