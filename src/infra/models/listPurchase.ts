import { DataTypes, Model } from "sequelize";

export class ListPurchaseEntity extends Model {
  declare id: number;
  declare name: string;
}

export default (sequelize: any) => {
  ListPurchaseEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
