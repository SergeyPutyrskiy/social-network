'use strict';
module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define('Token', {
    token: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Token.associate = function(models) {
    models['User'].hasMany(models['Token'], { foreignKey: 'userId' });
  };
  return Token;
};