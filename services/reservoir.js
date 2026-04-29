const Reservoir = require("../models/reservoir");

exports.create = async (data, userId) => {
  return await Reservoir.create({ ...data, operator_id: userId });
};

exports.myList = async (userId) => {
  return await Reservoir.findAll({ where: { operator_id: userId } });
};