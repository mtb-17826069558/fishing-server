const Payment = require("../models/payment");
const Reservation = require("../models/reservation");
const { Op } = require("sequelize");

exports.create = async (reservation_id, amount) => {
  await Reservation.update(
    { pay_status: 1 },
    { where: { id: reservation_id } },
  );
  return await Payment.create({ reservation_id, amount });
};

exports.statistics = async (start, end) => {
  return (
    (await Payment.sum("amount", {
      where: { createdAt: { [Op.between]: [start, end] } },
    })) || 0
  );
};
