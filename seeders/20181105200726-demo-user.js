module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert("Users", [
      {
        userName: "john_hulk",
        firstName: "John",
        lastName: "Hulk",
        email: "john.hulk@mail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]),
  /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkInsert('Person', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
  */
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {})
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.bulkDelete('Person', null, {});
  */
};
