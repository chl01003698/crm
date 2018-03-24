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

    async createService(name: string) {
        const model = this.ctx.model;        
        let role  = new model.CrmRole({name: name});
        role = await role.save();
        return await model.CrmRole.findByRoleName(name);
    }

    async queryByNameService(name: string) {
        const model = this.ctx.model;       
        return await model.CrmRole.findByRoleName(name);
    }
     
    async updateNameByIdService(id: string, name: string, isReview:number) {
        const model = this.ctx.model;       
        return await model.CrmRole.findAndUpdateRoleName(id, name, isReview);
    }

    async delNameById(id: string) {
        const model = this.ctx.model;       
        return await model.CrmRole.delete(id);
    }

}

module.exports = RoleService;

