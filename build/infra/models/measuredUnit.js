"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasuredUnitEntity = void 0;
const sequelize_1 = require("sequelize");
class MeasuredUnitEntity extends sequelize_1.Model {
}
exports.MeasuredUnitEntity = MeasuredUnitEntity;
exports.default = (sequelize) => {
    MeasuredUnitEntity.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
        },
        insert_datetime: {
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: "measuredUnit",
        tableName: "measured_unit",
    });
    return MeasuredUnitEntity;
};
