'use strict';
import { Service } from 'egg'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');

export class UserService extends Service {

    async createUser(userInfo: any){
        
       const model = this.ctx.model;
       if(userInfo.teams){
            let teamInfo = await model.CrmTeam.findTeamInfoByName(userInfo.teams);
            userInfo.teams = teamInfo._id;
       }
       if(userInfo.level){
           let roleInfo = await model.CrmRole.findByRoleName(userInfo.level);
           userInfo.role = roleInfo._id;         
       }
       if(userInfo.parentId){

       }
       let user  = new model.CrmUser(userInfo);
       user = await user.save();      
       return await model.CrmUser.findUserInfoByUserId(userInfo.userId);  
    }

    async findUserInfoById(id: string){
     return await this.ctx.model.CrmUser.findUserById(id);
    }

    async findUserInfoByUserId(userId: string){
        return await this.ctx.model.CrmUser.findUserInfoByUserId(userId);
       }

    async findUserInfoByUserIdAndPwd(userId: string, password: string){
        return await this.ctx.model.CrmUser.findUserInfoByUserIdAndPwd(userId, password);
       }

    async findUserInfoByFilter(filter: any){
        return await this.ctx.model.CrmUser.findUser(filter);
    }

    async updateUserInfoById(id: string, userinfo: any){
        return await this.ctx.model.CrmUser.findUserInfoAndUpdate(id, userinfo);
       }

    async searchByProvinceOrLevel(level: string, province: string) {
        
        let filter = {};
       if(!!level && !province){
           filter = {
               level: level           
        }

       }
       if(!!province && !level){
           filter = {
               province: province
           }
       }

       if(!!level && province){
           filter = {level: level, province: province}
       }

       return  await this.ctx.model.CrmUser.findUser(filter);
        
    }

    async updateFreeze(id: string, status: number) {
        
       return  await this.ctx.model.CrmUser.updateUserFreeze(id, status);
        
    }

    async getFreezeList() {
        
        return  await this.ctx.model.CrmUser.getFreezeList();
         
     }

//获取当前shortid 具有审核权限的上一级parentId
    async getMyIsReviewParentId(shortId){

    }

//获取我的信息和角色信息

   async getMyInfoAndRoleInfo(shortId){
       return await this.ctx.model.CrmUser.findUserAndRoleInfo(shortId);
   }
    

}
module.exports = UserService;

