'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      xid: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      nickname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      money: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      joinTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};