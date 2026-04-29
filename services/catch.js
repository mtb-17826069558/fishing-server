const Catch = require("../models/catch");

exports.create = async (data, userId) => {
  return await Catch.create({ ...data, user_id: userId });
};

exports.recycle = async (id) => {
  return await Catch.update({ recycle_status: 1 }, { where: { id } });
};