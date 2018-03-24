'use strict';
import { Controller } from 'egg'
import reply from '../../const/reply'
import type from '../../const/type'
import applyCards from '../../model/applyCards';


export class ApplyCardsController extends Controller {
  

  async applyCardsInfo() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body as any;
        this.ctx.validate(Joi.object().keys({
          id: Joi.string().required(),//可从session中获取
          toCurator: Joi.string().required(), //收卡人馆长id
          count: Joi.number().required(), //数量
          desc:Joi.string().required() //申请原因
      }), this.ctx.request.body);

        const applyInfo = {
            count: reqBody.count,
            content:[{roleName: '申请说明', desc: reqBody.desc}]
        }
        this.ctx.body = await this.ctx.service.applyCards.addApplyCardsInfo(reqBody.id, reqBody.toCurator, applyInfo );
  }


  //是否有需要审核的房卡信息，用于显示红点
  async getIsReviewCards(){

        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body as any;
        this.ctx.validate(Joi.object().keys({
          id: Joi.string().required()//可从session中获取
      }), this.ctx.request.body);

      const result = await this.ctx.service.applyCards.getIsReviewCards(reqBody.id);
      this.ctx.body = result
      }


      //获取审核列表
      async getMyReviewCardsList(){
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body as any;
        this.ctx.validate(Joi.object().keys({
          idd: Joi.string().required()//可从session中获取
        }), this.ctx.request.body);


      const result = await this.ctx.service.applyCards.getMyReviewCardsList(reqBody.idd);
      this.ctx.body = result;
  }



//同意申请信息
  async agreeApplyCards(){
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body as any;

        //TODO 判断此角色有没有审核的权限
        this.ctx.validate(Joi.object().keys({
          _id: Joi.string().required(),
          userId: Joi.string().required(),
          count: Joi.number().required(), //数量
          desc:Joi.string().required() //申请说明

      }), reqBody);

      const applyCardsInfo = await this.ctx.service.applyCards.getApplyCardsInfoById(reqBody._id);
     
      const applyInfo = applyCardsInfo.applyInfo;

      //更新
      //historyReviewer: [{type: Mixed, default:''}], //此卡审核过的人 [{shortId:123456, status:}]  status: 0:拒绝  1:同意
      //currentReviewer: {type: Number, default:'' }, // 当前审核的人

      const myInfo = await this.ctx.service.user.getMyInfoAndRoleInfo(reqBody.userId);
      console.log("======myInfo======",myInfo);

      applyInfo.content.push({roleName: myInfo.role.name, desc: reqBody.desc});//更新审核历史记录

      const modInfo = {
        ismod: parseInt(applyInfo.count)==parseInt(reqBody.count) ? 0:1,
        applyInfo: applyInfo,
        currentReviewer: "", //TODO 获取上一级有审核权的用户  如果达到管理员级更新status:1 已发状态，发放房卡
        historyReviewer: applyCardsInfo.historyReviewer
      }
      
      if(!!myInfo.parentId){
        modInfo.currentReviewer = myInfo.parentId;
      }

      modInfo.historyReviewer.push({
        shortId: reqBody._id,
        status: 1
      })

      const result = await this.ctx.service.applyCards.updateApplyInfo(reqBody._id, modInfo);
      this.ctx.body = result;
  }

  //拒绝申请房卡
  async refuseApplyCards(){

        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body as any;

        //TODO 判断此角色有没有审核的权限
        this.ctx.validate(Joi.object().keys({
          _id: Joi.string().required(),
          userId: Joi.string().required(),//可从session中获取
          desc:Joi.string().required() //申请说明
      }), reqBody);

      const applyCardsInfo = await this.ctx.service.applyCards.getApplyCardsInfoById(reqBody._id);
      const applyInfo = applyCardsInfo.applyInfo;

      const myInfo = await this.ctx.service.user.getMyInfoAndRoleInfo(reqBody.userId);
      applyInfo.content.push({roleName: "说明", desc: reqBody.desc});//更新审核历史记录

      const modInfo = {
        applyInfo: applyInfo,
        historyReviewer: applyCardsInfo.historyReviewer
      }

      modInfo.historyReviewer.push({
        shortId: reqBody.userId,
        status: 0
      })

      const result = await this.ctx.service.applyCards.updateRefuseApplyInfo(reqBody._id, modInfo);
      this.ctx.body = result;

  }


 
  

 
 

  


}
module.exports = ApplyCardsController;



