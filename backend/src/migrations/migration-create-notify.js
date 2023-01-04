"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("notifies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      donorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      donorName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recipientId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      recipientName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      donorDeleted: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      recipientDeleted: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      unitRequire: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("notifies");
  },
};
