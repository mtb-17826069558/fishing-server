const Comment = require("../models/comment");
const { success } = require("../utils");

exports.create = async (ctx) => {
  const data = await Comment.create({ ...ctx.request.body, user_id: ctx.user.id });
  success(ctx, data);
};