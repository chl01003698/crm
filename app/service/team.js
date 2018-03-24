'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
class TeamService extends egg_1.Service {
    async createService(teamInfo) {
        const model = this.ctx.model;
        let team = new model.CrmTeam(teamInfo);
        team = await team.save();
        return await model.CrmTeam.findTeamInfoByName(teamInfo.name);
    }
    async queryByNameService(name) {
        const model = this.ctx.model;
        return await model.CrmTeam.findByTeamName(name);
    }
    async updateNameByIdService(id, name) {
        const model = this.ctx.model;
        return await model.CrmTeam.findAndUpdateTeamName(id, name);
    }
    async delNameById(id) {
        const model = this.ctx.model;
        return await model.CrmTeam.delete(id, name);
    }
    async addUserIdInTeams(teamName, _userId, _parentId) {
        const teamInfo = await this.ctx.model.CrmTeam.findByTeamName(teamName);
        console.log("=======teamInfo========", teamInfo);
        //把userId 添加到users里并update
        teamInfo.users.push(_userId);
        teamInfo.parent = _parentId || "";
        const result = this.ctx.model.CrmTeam.updateTeamUsersById(teamInfo._id, teamInfo);
        console.log("addUserIdInTeams====", result);
    }
}
exports.TeamService = TeamService;
module.exports = TeamService;
