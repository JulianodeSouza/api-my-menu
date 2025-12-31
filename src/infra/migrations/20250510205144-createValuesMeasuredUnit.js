"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const measuredUnits = [
      { name: "kg", insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP") },
      { name: "g", insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP") },
      { name: "un", insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP") },
    ];

    await queryInterface.bulkInsert("measured_unit", measuredUnits);
  },

  async down(queryInterface) {
    const measuredUnits = [{ name: "kg" }, { name: "g" }, { name: "un" }];

    await queryInterface.bulkDelete("measured_unit", measuredUnits);
  },
};
