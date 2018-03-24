'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
class UserService extends egg_1.Service {
    async createUser(userInfo) {
        const model = this.ctx.model;
        if (userInfo.teams) {
            let teamInfo = await model.CrmTeam.findTeamInfoByName(userInfo.teams);
            userInfo.teams = teamInfo._id;
        }
        if (userInfo.level) {
            let roleInfo = await model.CrmRole.findByRoleName(userInfo.level);
            userInfo.role = roleInfo._id;
        }
        if (userInfo.parentId) {
        }
        let user = new model.CrmUser(userInfo);
        user = await user.save();
        return await model.CrmUser.findUserInfoByUserId(userInfo.userId);
    }
    async findUserInfoById(id) {
        return await this.ctx.model.CrmUser.findUserById(id);
    }
    async findUserInfoByUserId(userId) {
        return await this.ctx.model.CrmUser.findUserInfoByUserId(userId);
    }
    async findUserInfoByUserIdAndPwd(userId, password) {
        return await this.ctx.model.CrmUser.findUserInfoByUserIdAndPwd(userId, password);
    }
    async findUserInfoByFilter(filter) {
        return await this.ctx.model.CrmUser.findUser(filter);
    }
    async updateUserInfoById(id, userinfo) {
        return await this.ctx.model.CrmUser.findUserInfoAndUpdate(id, userinfo);
    }
    async searchByProvinceOrLevel(level, province) {
        let filter = {};
        if (!!level && !province) {
            filter = {
                level: level
            };
        }
        if (!!province && !level) {
            filter = {
                province: province
            };
        }
        if (!!level && province) {
            filter = { level: level, province: province };
        }
        return await this.ctx.model.CrmUser.findUser(filter);
    }
    async updateFreeze(id, status) {
        return await this.ctx.model.CrmUser.updateUserFreeze(id, status);
    }
    async getFreezeList() {
        return await this.ctx.model.CrmUser.getFreezeList();
    }
    //获取当前shortid 具有审核权限的上一级parentId
    async getMyIsReviewParentId(shortId) {
    }
    //获取我的信息和角色信息
    async getMyInfoAndRoleInfo(shortId) {
        return await this.ctx.model.CrmUser.findUserAndRoleInfo(shortId);
    }
}
exports.UserService = UserService;
module.exports = UserService;
