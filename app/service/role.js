'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
class RoleService extends egg_1.Service {
    async createService(applyInfo) {
        console.log("----createService-------", applyInfo);
        const model = this.ctx.model;
        let role = new model.CrmRole(applyInfo);
        role = await role.save();
        return await model.CrmRole.findByRoleName(applyInfo.name);
    }
    async getRoleList() {
        const list = await this.ctx.model.CrmRole.queryRoleList();
        return reply_1.default.success(list);
    }
    async queryByNameService(name) {
        const model = this.ctx.model;
        const result = await model.CrmRole.findByRoleName(name);
        if (!result) {
            return reply_1.default.err("查询失败");
        }
        return reply_1.default.success(result);
    }
    async queryByIdService(name) {
        const model = this.ctx.model;
        return await model.CrmRole.findByRoleId(name);
    }
    async updateNameByIdService(roleInfo) {
        const model = this.ctx.model;
        const result = await model.CrmRole.findAndUpdateRoleName(roleInfo);
        console.log("-------result--------", result);
        if (!result) {
            return reply_1.default.err("更新失败");
        }
        return reply_1.default.success("更新成功");
    }
    async delNameById(id) {
        const model = this.ctx.model;
        return await model.CrmRole.delete(id);
    }
}
exports.RoleService = RoleService;
module.exports = RoleService;
