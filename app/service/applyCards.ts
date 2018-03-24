'use strict';
import { Service } from 'egg'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
import * as _ from 'lodash';

export class ApplyCardsService extends Service {


    //推广员发起申请房卡
    async addApplyCardsInfo(userShortId: number, toCuratorShortId: number, applyInfo: any){

       const myParentInfo = await this.ctx.model.CrmUser.getMyparentId(userShortId);
    //    console.log("======myParentInfo=====", myParentInfo);
    //TOO 获取有审核权限的上一级用户
    //    if(myParentInfo.isReview){ //判断有没有审核权

    //    }
   
       const cardsInfo = {
        userShortId: userShortId,
        toCuratorShortId: toCuratorShortId,
        applyInfo: applyInfo,
        currentReviewer: myParentInfo.parentId
       }

      const model = this.ctx.model;
       let cardsModel  = new model.ApplyCards(cardsInfo);
       const result = await cardsModel.save();   
       return await model.ApplyCards.getApplyCardsInfoById(result._id);  
    }

   //获取需要我审核的房卡信息
    async getIsReviewCards(shortId: number){
        const model = this.ctx.model;
        const myReviewList =  await model.ApplyCards.getMyApplyCardsInfo(shortId);
        if(!myReviewList.length){
            return reply.success(0);
        }
        return reply.success(1);
    }


    async getMyReviewCardsList(shortId: number){
        const model = this.ctx.model;
        const applyInfoList =  await model.ApplyCards.getMyApplyCardsInfo(shortId);
        console.log("========list=========",applyInfoList);
        const userInfo = await model.CrmUser.findUserByShortId(shortId);
        
        const list= [];
        const totalByShortId = [];//用来统计申请人申请了多少房卡
        _.each(applyInfoList, function(item){
            const result = {
                _id: item._id,
                userName: userInfo.userName,
                cardsCount: item.applyInfo.count,
                status: item.status
            }
            list.push(result);
            //TODO 统计申请人的申请成功的房卡总数
            // const total = {
            //       shortId: item.userShortId,
            //       count: item.applyInfo.count
            // }
            // totalByShortId.push(tatal);
        })
       
        return reply.success(list);
    }

    async getApplyCardsInfoById(_id: string){
        const model = this.ctx.model;
        return await model.ApplyCards.getApplyCardsInfoById(_id);
    }

    async updateApplyInfo(_id:string, modInfo: any){
        const model = this.ctx.model;
        const result = await model.ApplyCards.updateApplyInfoById(modInfo);
        if(!result){
            return reply.err("审核失败");
        }
        return reply.success(result);
    }

}

module.exports = ApplyCardsService;

