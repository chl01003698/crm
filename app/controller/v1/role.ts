'use strict';
import { Controller } from 'egg'
import reply from '../../const/reply'
import type from '../../const/type'


export class RoleController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg user';
  }

  async create() {
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      name: Joi.string().required(),
      isReview: Joi.number().required(),
      isApply: Joi.number().required()
  }), reqBody);
  //  if(!!this.queryByName(reqBody.name)){
  //    return reply.err("已有此等级");
  //  }
    const applyInfo = {
      name: reqBody.name,
      isReview: reqBody.isReview,
      isApply: reqBody.isApply
    }
    const result = await this.ctx.service.role.createService(applyInfo);
    this.ctx.body = result;
  }

  async getRoleList(){
    const result = await this.ctx.service.role.getRoleList();
    this.ctx.body = result;
  }

  async queryByName(name){
    const result =  await this.ctx.service.role.queryByNameService(name);
    this.ctx.body = result;
  }

  async updateName() {
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      isReview: Joi.number().required(),//有没有审核权
      isApply: Joi.number().required()  //有没有申请权
  }), reqBody);

  //  if(!!this.queryByName(reqBody.name)){
  //    return reply.err("已有此等级");
  //  }

    const roleInfo = {
      id: reqBody.id,
      name: reqBody.name,
      isReview: reqBody.isReview,
      isApply: reqBody.isApply
    }
    
    const result = await this.ctx.service.role.updateNameByIdService(roleInfo);
    this.ctx.body = result;
  }

  async delById(){
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      id: Joi.string().required()
  }), this.ctx.params);
  const result = await this.ctx.service.role.delNameById(reqBody.id);
  if(result){
    return reply.success(result);
  }

  }
 

  


}
module.exports = RoleController;



