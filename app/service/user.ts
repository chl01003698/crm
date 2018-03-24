'use strict';
import { Service } from 'egg'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
import * as _ from 'lodash'
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');

export class UserService extends Service {


    async createUser(userInfo: any){
        console.log("--------userInfo--------",userInfo);
       const model = this.ctx.model;
       if(userInfo.teams){
            let teamInfo = await model.CrmTeam.findTeamInfoByName(userInfo.teams);
            if(!teamInfo){
                return reply.err("没有此组织")
               }
            userInfo.teams = teamInfo._id;
       }
       if(userInfo.roleName){
           let roleInfo = await model.CrmRole.findByRoleName(userInfo.roleName);
           if(!roleInfo){
            return reply.err("没有此等级")
           }
           userInfo.role = roleInfo._id;         
       }
       if(userInfo.parentId){
        let user = await this.findUserInfoByUserId(userInfo.parentId); 
        console.log("--------useruser--------",user);
        if(!user){
            return reply.err("上级ID错误")
        }
        userInfo.parentId = user._id;
        userInfo.parent = user;
        //   if(_.isNumber(userInfo.parentId)){//shortID
        //     let user = await this.findUserInfoByShortId(userInfo.parentId);
        //     userInfo.parentId = user.shortId;
        //   }else{//_id
        //     let user = await this.findUserInfoById(userInfo.parentId); 
        //     userInfo.parentId = user._id;
        //   }   
       }else{
           delete userInfo.parentId;
       }
       let user  = new model.CrmUser(userInfo);
       user = await user.save();      
       return await model.CrmUser.findUserInfoByUserId(userInfo.userId);  
    }

     //获取上一级有审核权的用户
     async getReviewUser(userId){

        
        const model = this.ctx.model;
        const doc = await model.CrmUser.findUserInfoByUserId(userId); 

        const pathArray = doc.path.split("#").reverse();
        pathArray.shift();
        const ancestorsList = await doc.getAncestors();
        let parentUser = {}; 
        for(var v of pathArray){
           let item =  _.find(ancestorsList,function(item){
               return item._id == v;
           });
           const roleInfo = await model.CrmRole.findByRoleId(item.role);
           if(roleInfo.isReview ==1){
            parentUser = item;
            break;
           }
        }
        console.log("=====parentUser====",parentUser);
        return parentUser;
     }

    async findUserInfoById(id: string){
     return await this.ctx.model.CrmUser.findUserById(id);
    }

    async queryRoleList(){
        const roleList = await this.ctx.model.CrmUser.findRoleList();
        return reply.success(roleList);
    }

    async findUserInfoByUserId(userId: string){
        return await this.ctx.model.CrmUser.findUserInfoByUserId(userId);
       }

    async findUserInfoByShortId(shortId: number){
    return await this.ctx.model.CrmUser.findUserByShortId(shortId);
    }

    async findUserInfoByUserIdAndPwd(userId: string, password: string){
        
        const user =  await this.ctx.model.CrmUser.findUserInfoByUserIdAndPwd(userId, password);
        if(!user){
            return reply.err("没有此用户");
        }
 
        if(user.isFreeze == 1){
            return reply.err('账号已被冻结');
        }
        this.ctx.session.user = {userId: user.userId, role: user.role}; //isAdmin: true ,isReview: 0  根据userInfo.role 判断
        //this.ctx.session.userId = user.userId;
        //this.ctx.session._id = user._id;
        //this.ctx.session.userName = user.userName;
        //this.ctx.session.isAdmin = user.isAdmin;
        let userInfo = {
            shortId: user.shortId,
            spreadUrl: user.spreadUrl,
            wechatId: user.wechatId,
            city: user.city,
            identityCard: user.identityCard,
            age: user.age,
            gender: user.gender,
            userName: user.userName,
            basicSalary: user.basicSalary,
            userId: user.userId,
            isAdmin: 0,
            isFreeze: user.isFreeze
        };
        
         //TODO
        if(user.role.name == "管理员"){
            userInfo.isAdmin = 1;
        }
         
        return userInfo;
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

   async getMyInfoAndRoleInfo(userId: string){
       return await this.ctx.model.CrmUser.findUserAndRoleInfoById(userId);
   }
    

}
module.exports = UserService;

