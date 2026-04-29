module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = { code: 500, msg: err.message, data: null };
  }
};