const FishingSpot = require("../models/fishingSpot");

exports.create = async (data) => {
  return await FishingSpot.create(data);
};

exports.listByReservoir = async (reservoir_id) => {
  return await FishingSpot.findAll({ where: { reservoir_id } });
};