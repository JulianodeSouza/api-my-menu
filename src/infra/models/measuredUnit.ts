import { DataTypes, Model } from "sequelize";

export class measuredUnitEntity extends Model {
  declare id: number;
  declare name: string;
}

export default (sequelize: any) => {
  measuredUnitEntity.init(
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
      modelName: "measuredUnit",
      tableName: "measured_unit",
    }
  );

  return measuredUnitEntity;
};
