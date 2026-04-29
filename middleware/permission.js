const { error } = require("../utils");

module.exports = (permission) => {
  return async (ctx, next) => {
    const userPermissions = ctx.user.permissions || [];
    
    if (!userPermissions.includes(permission)) {
      return error(ctx, "无权限访问", 403);
    }
    
    await next();
  };
};