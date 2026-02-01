import { DataTypes, Model } from "sequelize";

export class MeasuredUnitEntity extends Model {
  declare id: number;
  declare name: string;
  declare insertDatetime: Date;
  declare unitSymbol: string;
}

export default (sequelize: any) => {
  MeasuredUnitEntity.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      unitSymbol: {
        type: DataTypes.STRING,
        field: "unit_symbol",
      },
      insertDatetime: {
        type: DataTypes.DATE,
        field: "insert_datetime",
      },
    },
    {
      sequelize,
      modelName: "measuredUnit",
      tableName: "measured_unit",
    },
  );

  return MeasuredUnitEntity;
};
