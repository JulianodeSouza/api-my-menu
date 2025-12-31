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
    logging: process.env.NODE_ENV === "development" ? true : false,
    define: {
      timestamps: false,
    },
    timezone: "-03:00",
    pool: {
      max: 1,
    },
  }
);

const CategoryEntity = Category(sequelize);
const MeasuredUnitEntity = MeasuredUnit(sequelize);
const ListPurchaseEntity = ListPurchase(sequelize);

ListPurchaseEntity.belongsTo(CategoryEntity, { foreignKey: "id_category" });
ListPurchaseEntity.belongsTo(MeasuredUnitEntity, {
  foreignKey: "id_measured_unit",
});

CategoryEntity.hasMany(ListPurchaseEntity, { foreignKey: "id_category" });
MeasuredUnitEntity.hasMany(ListPurchaseEntity, {
  foreignKey: "id_measured_unit",
});

export default sequelize;
