"use strict";
module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define(
    "Friends",
    {
      userId1: {
        type: DataTypes.INTEGER,
        unique: true
      },
      userId2: {
        type: DataTypes.INTEGER,
        unique: true
      }
    },
    {}
  );
  Friends.associate = function(models) {
    models.User.hasMany(models.Friends, { foreignKey: "userId1" });
    models.User.hasMany(models.Friends, { foreignKey: "userId2" });
  };
  return Friends;
};
