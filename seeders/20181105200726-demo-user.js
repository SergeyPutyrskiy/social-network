const bcrypt = require("bcrypt");

module.exports = {
  up: (queryInterface, Sequelize) =>
    bcrypt.hash("1234", 10).then(hash => {
      queryInterface.bulkInsert("Users", [
        {
          userName: "john_hulk",
          firstName: "John",
          lastName: "Hulk",
          email: "john.hulk@mail.com",
          password: hash,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {})
};
