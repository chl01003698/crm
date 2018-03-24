'use strict';
import { Service } from 'egg'
import Wechat from '../helper/wechat'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
import { phone } from 'yunpian-sdk';
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');

export class TeamService extends Service {

    async createService(teamInfo: any) {
        const model = this.ctx.model;        
        let team = new model.CrmTeam(teamInfo);
        team = await team.save();
        return await model.CrmTeam.findTeamInfoByName(teamInfo.name);
    }

    async queryByNameService(name: string) {
        const model = this.ctx.model;       
        return await model.CrmTeam.findByTeamName(name);
    }
     
    async updateNameByIdService(id: string, name: string) {
        const model = this.ctx.model;       
        return await model.CrmTeam.findAndUpdateTeamName(id, name);
    }

    async delNameById(id: string) {
        const model = this.ctx.model;       
        return await model.CrmTeam.delete(id, name);
    }

    async addUserIdInTeams(teamName, _userId, _parentId){
        const teamInfo = await this.ctx.model.CrmTeam.findByTeamName(teamName);
        console.log("=======teamInfo========",teamInfo);
        //把userId 添加到users里并update
        teamInfo.users.push(_userId);

        teamInfo.parent = _parentId || "";
        const result =  this.ctx.model.CrmTeam.updateTeamUsersById(teamInfo._id, teamInfo )
        console.log("addUserIdInTeams====",result);

    }

}

module.exports = TeamService;

