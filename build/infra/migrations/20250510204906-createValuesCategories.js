"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const categories = [
            {
                name: "Bebidas",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Frutas",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Carnes",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Laticínios",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Limpeza",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Higiene",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Legumes",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Temperos",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Não perecíveis",
                insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            { name: "Pet", insert_datetime: Sequelize.literal("CURRENT_TIMESTAMP") },
        ];
        await queryInterface.bulkInsert("category", categories);
    },
    async down(queryInterface) {
        const categories = [
            { name: "Bebidas" },
            { name: "Frutas" },
            { name: "Carnes" },
            { name: "Laticínios" },
            { name: "Limpeza" },
            { name: "Higiene" },
            { name: "Legumes" },
            { name: "Temperos" },
            { name: "Não perecíveis" },
            { name: "Pet" },
        ];
        await queryInterface.bulkDelete("category", categories);
    },
};
