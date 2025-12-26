"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
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
        ];
        await queryInterface.bulkDelete("category", categories);
    },
};
