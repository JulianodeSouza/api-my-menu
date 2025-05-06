import { DataTypes, Model } from "sequelize";

export class CategoriesEntity extends Model {
  declare id: number;
  declare name: string;
}

export default (sequelize: any) => {
  CategoriesEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "categories",
    }
  );
};
