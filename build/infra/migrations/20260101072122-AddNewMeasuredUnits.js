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
        await queryInterface.bulkInsert("measured_unit", newMeasuredUnits);
    },
    async down(queryInterface) {
        const unitNames = ["cx"];
        await queryInterface.bulkDelete("measured_unit", {
            name: unitNames,
        });
    },
};
