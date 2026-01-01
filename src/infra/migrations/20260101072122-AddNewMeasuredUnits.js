"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const newMeasuredUnits = [
      {
        name: "cx",
        insert_datetime: new Date(),
      },
    ];

    queryInterface.bulkInsert("measured_units", newMeasuredUnits);
  },

  async down(queryInterface) {
    const unitNames = ["cx"];

    queryInterface.bulkDelete("measured_units", {
      name: unitNames,
    });
  },
};
