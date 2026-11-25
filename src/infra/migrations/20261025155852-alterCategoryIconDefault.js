"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("category", "icon", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Tag",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("category", "icon", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
