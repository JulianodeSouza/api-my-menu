"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const measuredUnits = [
      {
        name: "Quilograma",
        unit_symbol: "kg",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Unidade",
        unit_symbol: "un",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Grama",
        unit_symbol: "g",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Litro",
        unit_symbol: "l",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Mililitro",
        unit_symbol: "ml",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Dúzia",
        unit_symbol: "dz",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      {
        name: "Pacote",
        unit_symbol: "pc",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    ];

    await queryInterface.bulkInsert("measured_unit", measuredUnits);
  },

  async down(queryInterface) {
    const measuredUnits = [{ name: "kg" }, { name: "un" }];

    await queryInterface.bulkDelete("measured_unit", measuredUnits);
  },
};
