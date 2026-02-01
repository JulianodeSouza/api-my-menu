"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = [
      {
        name: "Bebidas",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "BottleWine",
      },
      {
        name: "Hortifruti",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "Apple",
      },
      {
        name: "Carnes",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "Beef",
      },
      {
        name: "Pet",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "PawPrint",
      },

      {
        name: "Limpeza",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "BrushCleaning",
      },
      {
        name: "Higiene",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "Bubbles",
      },
      {
        name: "Mercearia",
        insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
        icon: "Utensils",
      },
    ];

    await queryInterface.bulkInsert("category", categories);
  },

  async down(queryInterface) {
    const categories = [
      { name: "Bebidas" },
      { name: "Hortifruti" },
      { name: "Carnes" },
      { name: "Pet" },
      { name: "Limpeza" },
      { name: "Higiene" },
      { name: "Mercearia" },
    ];
    await queryInterface.bulkDelete("category", categories);
  },
};
