import { DataTypes, Model } from "sequelize";

export class ListPurchaseEntity extends Model {
  declare id?: number;
  declare id_category?: number;
  declare id_measured_unit?: number;
  declare name: string;
  declare quantity: number;
  declare checked: boolean;
  declare amount: number;
  declare totalCaught: number;
  declare insert_datetime: Date;
  declare active: boolean;
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
        allowNull: true,
      },
      totalCaught: {
        type: DataTypes.REAL,
      },
      insert_datetime: {
        type: DataTypes.DATE,
      },
      finishDatePurchase: {
        type: DataTypes.DATE,
        field: "finish_date_purchase",
      },
      id_category: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
      },
      id_measured_unit: {
        type: DataTypes.INTEGER,
        references: {
          model: "measured_unit",
          key: "id",
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "ListPurchase",
      tableName: "list_purchase",
    },
  );

  return ListPurchaseEntity;
};
