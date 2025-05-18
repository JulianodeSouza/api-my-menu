import sequelize from "@/infra/models";
import { QueryTypes } from "sequelize";

export default class DefaultProvider {
  async getAll(sql: string, replacements?: any): Promise<any[]> {
    const result = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return result;
  }

  async getOne(sql: string, replacements?: any): Promise<any> {
    const result = await sequelize.query(sql, {
      replacements,
      type: QueryTypes.SELECT,
    });

    return result[0];
  }
}
