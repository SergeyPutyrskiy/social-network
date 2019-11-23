module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn(
        "Messages",
        "receiverId",
        {
          type: Sequelize.INTEGER
        },
        { transaction }
      );
      await queryInterface.renameColumn("Messages", "userId", "senderId", {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn("Messages", "receiverId", {
        transaction
      });
      await queryInterface.renameColumn("Messages", "senderId", "userId", {
        transaction
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
