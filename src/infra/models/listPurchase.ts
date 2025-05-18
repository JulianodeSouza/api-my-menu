import { DataTypes, Model } from "sequelize";

export class ListPurchaseEntity extends Model {
  declare id?: number;
  declare idCategory?: number;
  declare idMeasuredUnit?: number;
  declare name: string;
  declare quantity: number;
  declare checked: boolean;
  declare amount: number;
  declare totalCaught: number;
  declare insertDatetime: Date;
}

export default (sequelize: any) => {
  ListPurchaseEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      checked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      amount: {
        type: DataTypes.REAL,
        allowNull: false,
      },
      totalCaught: {
        type: DataTypes.REAL,
      },
      insertDatetime: {
        type: DataTypes.DATE,
      },
      idCategory: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      idMeasuredUnit: {
        type: DataTypes.INTEGER,
        references: {
          model: "measured_unit",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "ListPurchase",
      tableName: "list_purchase",
    }
  );

  return ListPurchaseEntity;
};
