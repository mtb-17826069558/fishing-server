const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { JWT_SECRET, JWT_EXPIRES } = require("../config");
const { success, error } = require("../utils");

exports.register = async (ctx) => {
  const { phone, password, name, role } = ctx.request.body;
  const [user] = await User.findOrCreate({
    where: { phone },
    defaults: { password, name, role }
  });
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  success(ctx, { token, user });
};

exports.login = async (ctx) => {
  const { phone, password } = ctx.request.body;
  const user = await User.findOne({ where: { phone } });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return error(ctx, "账号或密码错误");
  }
  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  success(ctx, { token, user });
};