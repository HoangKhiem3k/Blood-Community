"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      recipientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      donorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      groupBlood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      unitRequire: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: true,
      },
      offerBenefit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("requests");
  },
};
