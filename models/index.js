const Sequelize = require('sequelize');
const sequelize = new Sequelize('socialnetwork', 'postgres', '123456', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});
const models = {
  User: sequelize.import('./user'),
  Token: sequelize.import('./token'),
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
