const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const User = require("../models/user");

module.exports = async (ctx, next) => {
  const authHeader = ctx.headers.authorization || "";
  
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    ctx.body = { code: 401, msg: "请先登录", data: null };
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    const user = await User.findByPk(decoded.id);
    if (user) {
      ctx.user = {
        id: user.id,
        role: user.role,
        permissions: user.permissions ? JSON.parse(user.permissions) : []
      };
    } else {
      ctx.body = { code: 401, msg: "用户不存在", data: null };
      return;
    }
    
    await next();
  } catch (err) {
    ctx.body = { code: 401, msg: "登录已过期", data: null };
  }
};