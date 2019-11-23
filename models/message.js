module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: DataTypes.STRING,
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER
    },
    {}
  );
  Message.associate = models => {
    models.Message.belongsTo(models.User, {
      as: "sender",
      foreignKey: "senderId"
    });
    models.Message.belongsTo(models.User, {
      as: "receiver",
      foreignKey: "receiverId"
    });
  };

  return Message;
};
