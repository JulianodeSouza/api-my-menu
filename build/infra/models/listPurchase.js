"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPurchaseEntity = void 0;
const sequelize_1 = require("sequelize");
class ListPurchaseEntity extends sequelize_1.Model {
}
exports.ListPurchaseEntity = ListPurchaseEntity;
exports.default = (sequelize) => {
    ListPurchaseEntity.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: sequelize_1.DataTypes.REAL,
            allowNull: false,
        },
        checked: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        amount: {
            type: sequelize_1.DataTypes.REAL,
            allowNull: false,
        },
        totalCaught: {
            type: sequelize_1.DataTypes.REAL,
        },
        insertDatetime: {
            type: sequelize_1.DataTypes.DATE,
        },
        idCategory: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "category",
                key: "id",
            },
        },
        idMeasuredUnit: {
            type: sequelize_1.DataTypes.INTEGER,
            references: {
                model: "measured_unit",
                key: "id",
            },
        },
    }, {
        sequelize,
        modelName: "ListPurchase",
        tableName: "list_purchase",
    });
    return ListPurchaseEntity;
};
