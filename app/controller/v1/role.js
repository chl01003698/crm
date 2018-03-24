'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const reply_1 = require("../../const/reply");
class RoleController extends egg_1.Controller {
    async index() {
        this.ctx.body = 'hi, egg user';
    }
    async create() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            name: Joi.string().required()
        }), this.ctx.request.body);
        //  if(!!this.queryByName(reqBody.name)){
        //    return reply​​.err("已有此等级");
        //  }
        console.log("------name------", reqBody.name);
        const result = await this.ctx.service.role.createService(reqBody.name);
        this.ctx.body = result;
    }
    async queryByName(name) {
        return await this.ctx.service.role.queryByNameService(name);
    }
    async updateName() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().required(),
            isReview: Joi.number().required()
        }), this.ctx.params);
        if (!!this.queryByName(reqBody.name)) {
            return reply_1.default.err("已有此等级");
        }
        const result = await this.ctx.service.role.updateNameByIdService(reqBody.id, reqBody.name, reqBody.isReview);
        this.ctx.body = result;
        return reply_1.default.success(result);
    }
    async delById() {
        const Joi = this.app.Joi;
        const reqBody = this.ctx.request.body;
        this.ctx.validate(Joi.object().keys({
            id: Joi.string().required()
        }), this.ctx.params);
        const result = await this.ctx.service.role.delNameById(reqBody.id);
        if (result) {
            return reply_1.default.success(result);
        }
    }
}
exports.RoleController = RoleController;
module.exports = RoleController;
