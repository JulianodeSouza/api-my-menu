import { DataTypes, Model } from "sequelize";

export class CategoryEntity extends Model {
  declare id: number;
  declare name: string;
  declare insertDatetime: Date;
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
      insertDatetime: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "category",
      tableName: "category",
    }
  );

  return CategoryEntity;
};
