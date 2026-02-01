import { DataTypes, Model } from "sequelize";

export class CategoryEntity extends Model {
  declare id: number;
  declare name: string;
  declare insert_datetime: Date;
  declare icon: string;
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
      icon: {
        type: DataTypes.STRING,
      },
      insert_datetime: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "category",
      tableName: "category",
    },
  );

  return CategoryEntity;
};
