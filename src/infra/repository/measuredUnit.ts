import { IMeasuredUnit } from "@/types/measuredUnit";
import RepositoryModel from "./repository";
import { MeasuredUnitEntity } from "../models/measuredUnit";

export default class MeasuredUnitRepository extends RepositoryModel {
  async getAllMeasuredUnits(): Promise<IMeasuredUnit[]> {
    const measuredUnits = await this.getAll<IMeasuredUnit>({
      model: MeasuredUnitEntity,
    });
    return measuredUnits;
  }

  async register(data: IMeasuredUnit): Promise<void> {
    const itemToSave = MeasuredUnitEntity.build({
      name: data.name,
      unitSymbol: data.unitSymbol,
      insertDatetime: new Date(),
    });

    await this.save({ model: itemToSave });
  }

  async updateRegister(
    idMeasuredUnit: number,
    data: Partial<IMeasuredUnit>,
  ): Promise<void> {
    const itemToUpdate: Partial<MeasuredUnitEntity> = {};

    if (data.name !== undefined) itemToUpdate.name = data.name;
    if (data.unitSymbol !== undefined)
      itemToUpdate.unitSymbol = data.unitSymbol;

    await this.update({
      model: MeasuredUnitEntity,
      params: { id: idMeasuredUnit },
      data: itemToUpdate,
    });
  }

  async removeRegister(idMeasuredUnit: number): Promise<void> {
    await this.remove({
      model: MeasuredUnitEntity,
      params: { id: idMeasuredUnit },
    });
  }
}
