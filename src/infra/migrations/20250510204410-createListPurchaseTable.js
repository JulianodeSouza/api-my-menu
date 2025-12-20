"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("list_purchase", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      checked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      totalCaught: {
        type: Sequelize.FLOAT,
      },
      insertDatetime: {
        type: Sequelize.DATE,
      },
      idCategory: {
        type: Sequelize.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      idMeasuredUnit: {
        type: Sequelize.INTEGER,
        references: {
          model: "measured_unit",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("list_purchase");
  },
};
