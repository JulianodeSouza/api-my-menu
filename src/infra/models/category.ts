import { DataTypes, Model } from "sequelize";

export class CategoryEntity extends Model {
  declare id: number;
  declare name: string;
}

export default (sequelize: any) => {
  CategoryEntity.init(
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
      modelName: "Category",
      tableName: "category",
    }
  );

  return CategoryEntity;
};
