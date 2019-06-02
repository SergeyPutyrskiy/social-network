module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      message: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  Message.associate = function(models) {
    models.User.hasMany(models.Message, { foreignKey: "userId" });
  };

  return Message;
};
