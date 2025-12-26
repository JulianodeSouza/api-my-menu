"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepositoryModel {
    async getAll(parameters) {
        const itemsList = await parameters.model.findAll({
            where: parameters.params || {},
            include: parameters.includes,
        });
        return itemsList;
    }
    async getOne(parameters) {
        const itemList = await parameters.model.findOne({
            where: parameters.params || {},
            include: parameters.includes,
        });
        return itemList;
    }
    async save(parameters) {
        await parameters.model.save();
    }
    async update(parameters) {
        await parameters.model.update(parameters.data, {
            where: parameters.params,
        });
    }
    async delete(parameters) {
        await parameters.model.update(parameters.data, {
            where: parameters.params,
        });
    }
}
exports.default = RepositoryModel;
