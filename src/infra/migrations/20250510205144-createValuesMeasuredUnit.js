"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const measuredUnits = [{ name: "kg" }, { name: "g" }, { name: "un" }];

    await queryInterface.bulkInsert("measured_unit", measuredUnits);
  },

  async down(queryInterface) {
    const measuredUnits = [{ name: "kg" }, { name: "g" }, { name: "un" }];

    await queryInterface.bulkDelete("measured_unit", measuredUnits);
  },
};
