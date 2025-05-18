import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import Category from "./category";
import ListPurchase from "./listPurchase";
import MeasuredUnit from "./measuredUnit";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    define: {
      timestamps: false,
    },
    timezone: "-03:00",
  }
);

const CategoryEntity = Category(sequelize);
const MeasuredUnitEntity = MeasuredUnit(sequelize);
const ListPurchaseEntity = ListPurchase(sequelize);

ListPurchaseEntity.belongsTo(CategoryEntity, { foreignKey: "idCategory" });
ListPurchaseEntity.belongsTo(MeasuredUnitEntity, {
  foreignKey: "idMeasuredUnit",
});

CategoryEntity.hasMany(ListPurchaseEntity, { foreignKey: "idCategory" });
MeasuredUnitEntity.hasMany(ListPurchaseEntity, {
  foreignKey: "idMeasuredUnit",
});

export default sequelize;
