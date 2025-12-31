import { DataTypes, Model } from "sequelize";

export class MeasuredUnitEntity extends Model {
  declare id: number;
  declare name: string;
  declare insert_datetime: Date;
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
      insert_datetime: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "measuredUnit",
      tableName: "measured_unit",
    }
  );

  return MeasuredUnitEntity;
};
