'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class ApplyCardsController extends egg_1.Controller {
    async applyCardsInfo() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            userShortId: Joi.string().required(),
            toCuratorShortId: Joi.string().required(),
            count: Joi.number().required(),
            desc: Joi.string().required() //申请原因
        }), this.ctx.request.body);
        const applyInfo = {
            count: reqBody.count,
            content: [{ roleName: '申请说明', desc: reqBody.desc }]
        };
        this.ctx.body = await this.ctx.service.applyCards.addApplyCardsInfo(reqBody.userShortId, reqBody.toCuratorShortId, applyInfo);
    }
    //获取需要我审核的房卡信息，用于显示红点
    async getIsReviewCards() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            userShortId: Joi.string().required() //可从session中获取
        }), this.ctx.request.body);
        const result = await this.ctx.service.applyCards.getIsReviewCards(reqBody.userShortId);
        this.ctx.body = result;
    }
    //获取审核列表
    async getMyReviewCardsList() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            userShortId: Joi.string().required() //可从session中获取
        }), this.ctx.request.body);
        const result = await this.ctx.service.applyCards.getMyReviewCardsList(reqBody.userShortId);
        this.ctx.body = result;
    }
    //同意申请信息
    async agreeApplyCards() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        //TODO 判断此角色有没有审核的权限
        this.ctx.validate(Joi.object().keys({
            _id: Joi.string().required(),
            userShortId: Joi.string().required(),
            count: Joi.number().required(),
            desc: Joi.string().required() //申请说明
        }), reqBody);
        const applyCardsInfo = await this.ctx.service.applyCards.getApplyCardsInfoById(reqBody._id);
        console.log("=====applyCardsInfo======", applyCardsInfo);
        const applyInfo = applyCardsInfo.applyInfo;
        console.log("=====applyInfo======", applyInfo);
        //更新
        //historyReviewer: [{type: Mixed, default:''}], //此卡审核过的人 [{shortId:123456, status:}]  status: 0:拒绝  1:同意
        //currentReviewer: {type: Number, default:'' }, // 当前审核的人
        const myInfo = await this.ctx.service.user.getMyInfoAndRoleInfo(reqBody.userShortId);
        console.log("=====myInfo33333======", myInfo);
        applyInfo.content.push({ rolename: myInfo.role.name, desc: reqBody.desc }); //更新审核历史记录
        console.log("=====applyInfo22222======", applyInfo);
        //判断count ，获取applyInfo 更新
        const modInfo = {
            ismod: parseInt(applyInfo.count) == parseInt(reqBody.count) ? 0 : 1,
            applyInfo: applyInfo,
            currentReviewer: applyCardsInfo.currentReviewer,
            historyReviewer: applyCardsInfo.historyReviewer
        };
        console.log("=====modInfo======", modInfo.ismod);
        if (!!myInfo.parentId) {
            modInfo.currentReviewer = myInfo.parentId;
        }
        modInfo.historyReviewer.push({
            shortId: reqBody.userShortId,
            status: 1
        });
        console.log("=====modInfo11111111======", JSON.stringify(modInfo));
        const result = await this.ctx.service.applyCards.updateApplyInfo(reqBody._id, modInfo);
        this.ctx.body = result;
    }
    //拒绝审核信息
    async refuseApplyCards() {
    }
}
exports.ApplyCardsController = ApplyCardsController;
module.exports = ApplyCardsController;
