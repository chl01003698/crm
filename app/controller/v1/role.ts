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
      name: Joi.string().required()
  }), this.ctx.request.body);
  //  if(!!this.queryByName(reqBody.name)){
  //    return reply​​.err("已有此等级");
  //  }
   console.log("------name------",reqBody.name)
    const result = await this.ctx.service.role.createService(reqBody.name);
    this.ctx.body = result;
  }

  async queryByName(name){
    return await this.ctx.service.role.queryByNameService(name);
     
  }

  async updateName() {
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required(),
      isReview: Joi.number().required()
  }), this.ctx.params);

   if(!!this.queryByName(reqBody.name)){
     return reply​​.err("已有此等级");
   }

    const result = await this.ctx.service.role.updateNameByIdService(reqBody.id,reqBody.name,reqBody.isReview);
    this.ctx.body = result;
    return reply.success(result);
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



