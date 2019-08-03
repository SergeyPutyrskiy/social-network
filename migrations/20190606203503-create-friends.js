"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addConstraint("Friends", ["userId1", "userId2"], {
      type: "unique",
      name: "Friends_userId1_userId2_uk"
    }),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint("Friends", "Friends_userId1_userId2_uk", {
      type: "unique"
    })
};
