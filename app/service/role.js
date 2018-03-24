'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
class RoleService extends egg_1.Service {
    async createService(name) {
        const model = this.ctx.model;
        let role = new model.CrmRole({ name: name });
        role = await role.save();
        return await model.CrmRole.findByRoleName(name);
    }
    async queryByNameService(name) {
        const model = this.ctx.model;
        return await model.CrmRole.findByRoleName(name);
    }
    async updateNameByIdService(id, name, isReview) {
        const model = this.ctx.model;
        return await model.CrmRole.findAndUpdateRoleName(id, name, isReview);
    }
    async delNameById(id) {
        const model = this.ctx.model;
        return await model.CrmRole.delete(id);
    }
}
exports.RoleService = RoleService;
module.exports = RoleService;
