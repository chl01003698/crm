'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../const/reply");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
const _ = require("lodash");
class ApplyCardsService extends egg_1.Service {
    //推广员发起申请房卡
    async addApplyCardsInfo(id, toCurator, applyInfo) {
        //const myParentInfo = await this.ctx.model.CrmUser.getMyparentId(userId);
        const myParentInfo = await this.ctx.service.user.getReviewUser(userId);
        const cardsInfo = {
            applyerId: id,
            toCurator: toCurator,
            applyInfo: applyInfo,
            currentReviewer: myParentInfo._id || ''
        };
        console.log("========cardsInfo=========", cardsInfo);
        const model = this.ctx.model;
        let cardsModel = new model.ApplyCards(cardsInfo);
        const result = await cardsModel.save();
        return await model.ApplyCards.getApplyCardsInfoById(result._id);
    }
    //获取需要我审核的房卡信息
    async getIsReviewCards(id) {
        const model = this.ctx.model;
        const myReviewList = await model.ApplyCards.getMyApplyCardsInfo(id);
        if (!myReviewList.length) {
            return reply_1.default.success(0);
        }
        return reply_1.default.success(1);
    }
    async getMyReviewCardsList(userId) {
        const model = this.ctx.model;
        const applyInfoList = await model.ApplyCards.getMyApplyCardsInfo(userId);
        const userInfo = await model.CrmUser.findUserById(applyInfoList[0].currentReviewer);
        const list = [];
        const totalByShortId = []; //用来统计申请人申请了多少房卡
        _.each(applyInfoList, function (item) {
            const result = {
                _id: item._id,
                userName: userInfo.userName,
                cardsCount: item.applyInfo.count,
                status: item.status
            };
            list.push(result);
            //TODO 统计申请人的申请成功的房卡总数
            // const total = {
            //       shortId: item.userShortId,
            //       count: item.applyInfo.count
            // }
            // totalByShortId.push(tatal);
        });
        return reply_1.default.success(list);
    }
    async getApplyCardsInfoById(_id) {
        const model = this.ctx.model;
        return await model.ApplyCards.getApplyCardsInfoById(_id);
    }
    async updateApplyInfo(_id, modInfo) {
        const model = this.ctx.model;
        const result = await model.ApplyCards.updateApplyInfoById(_id, modInfo);
        if (!result) {
            return reply_1.default.err("审核失败");
        }
        return reply_1.default.success(result);
    }
    async updateRefuseApplyInfo(_id, modInfo) {
        const model = this.ctx.model;
        const result = await model.ApplyCards.updateRefuseApplyInfoById(_id, modInfo);
        if (!result) {
            return reply_1.default.err("拒绝失败");
        }
        return reply_1.default.success(result);
    }
}
exports.ApplyCardsService = ApplyCardsService;
module.exports = ApplyCardsService;
