"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryEntity = void 0;
const sequelize_1 = require("sequelize");
class CategoryEntity extends sequelize_1.Model {
}
exports.CategoryEntity = CategoryEntity;
exports.default = (sequelize) => {
    CategoryEntity.init({
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
        modelName: "category",
        tableName: "category",
    });
    return CategoryEntity;
};
