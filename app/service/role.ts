'use strict';
import { Service } from 'egg'
import Wechat from '../helper/wechat'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
import { phone } from 'yunpian-sdk';
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');

export class RoleService extends Service {

    async createService(applyInfo: any) {
        console.log("----createService-------",applyInfo);
        const model = this.ctx.model;        
        let role  = new model.CrmRole(applyInfo);
        role = await role.save();
        return await model.CrmRole.findByRoleName(applyInfo.name);
    }

    async getRoleList(){
        const list =  await this.ctx.model.CrmRole.queryRoleList();
        return reply.success(list);
    }
    async queryByNameService(name: string) {
        const model = this.ctx.model;       
        const result =  await model.CrmRole.findByRoleName(name);
        if(!result){
            return reply.err("查询失败");
        }
        return reply.success(result);

    }

    async queryByIdService(name: string) {
        const model = this.ctx.model;       
        return await model.CrmRole.findByRoleId(name);
    }
     
    async updateNameByIdService(roleInfo: any) {
        const model = this.ctx.model;       
        const result =  await model.CrmRole.findAndUpdateRoleName(roleInfo);
        console.log("-------result--------",result);
        if(!result){
            return reply.err("更新失败");
        }
        return reply.success("更新成功");
    }

    async delNameById(id: string) {
        const model = this.ctx.model;       
        return await model.CrmRole.delete(id);
    }

}

module.exports = RoleService;

