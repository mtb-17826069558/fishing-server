const { error } = require("../utils");

module.exports = async (ctx, next) => {
  console.log("User Role:", ctx.user.role, "Type:", typeof ctx.user.role);

  if (parseInt(ctx.user.role) !== 3) {
    return error(ctx, "无权限访问", 403);
  }
  await next();
};
