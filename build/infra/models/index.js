"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const category_1 = __importDefault(require("./category"));
const listPurchase_1 = __importDefault(require("./listPurchase"));
const measuredUnit_1 = __importDefault(require("./measuredUnit"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_DATABASE || "", process.env.DB_USER || "", process.env.DB_PASSWORD || "", {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? true : false,
    define: {
        timestamps: false,
    },
    timezone: "-03:00",
    pool: {
        max: 1,
    },
});
const CategoryEntity = (0, category_1.default)(sequelize);
const MeasuredUnitEntity = (0, measuredUnit_1.default)(sequelize);
const ListPurchaseEntity = (0, listPurchase_1.default)(sequelize);
ListPurchaseEntity.belongsTo(CategoryEntity, { foreignKey: "id_category" });
ListPurchaseEntity.belongsTo(MeasuredUnitEntity, {
    foreignKey: "id_measured_unit",
});
CategoryEntity.hasMany(ListPurchaseEntity, { foreignKey: "id_category" });
MeasuredUnitEntity.hasMany(ListPurchaseEntity, {
    foreignKey: "id_measured_unit",
});
exports.default = sequelize;
