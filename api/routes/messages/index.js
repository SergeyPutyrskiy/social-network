const Sequelize = require("sequelize");

const { Op } = Sequelize;

const models = require("../../models/index");

const getMessages = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.query;
    const messages = await models.Message.findAll({
      order: [["createdAt", "ASC"]],
      where: {
        [Op.and]: [
          {
            senderId: {
              [Op.or]: [senderId, receiverId]
            }
          },
          {
            receiverId: {
              [Op.or]: [senderId, receiverId]
            }
          }
        ]
      },
      include: [
        {
          model: models.User,
          as: "sender",
          required: true
        },
        {
          model: models.User,
          as: "receiver",
          required: true
        }
      ]
    });

    res.status(200).json({
      data: {
        messages
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMessages: [getMessages]
};
