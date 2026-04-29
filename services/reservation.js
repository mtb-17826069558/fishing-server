const Reservation = require("../models/reservation");
const FishingSpot = require("../models/fishingSpot");
const { Op } = require("sequelize");

exports.create = async (data, userId) => {
  const spot = await FishingSpot.findByPk(data.spot_id);
  if (!spot) throw new Error("钓位不存在");

  const has = await Reservation.findOne({
    where: {
      spot_id: data.spot_id,
      start_time: { [Op.lt]: data.end_time },
      end_time: { [Op.gt]: data.start_time }
    }
  });
  if (has) throw new Error("时段冲突");

  return await Reservation.create({ ...data, user_id: userId });
};

exports.verify = async (id) => {
  return await Reservation.update({ verify_status: 1 }, { where: { id } });
};