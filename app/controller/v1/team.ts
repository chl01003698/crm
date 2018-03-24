'use strict';
import { Controller } from 'egg'
import reply from '../../const/reply'
import type from '../../const/type'


export class TeamController extends Controller {
  

  async create() {

    const Joi = this.app.Joi;  
    this.ctx.validate(Joi.object().keys({
      name: Joi.string().required()
  }), this.ctx.request.body);

  const reqBody = this.ctx.request.body as any;
//    if(!!this.queryByName(reqBody.name)){
//      return reply.err("已有此组织");
//    }

    const teamInfo = {
        name: reqBody.name,
    };
    const result = await this.ctx.service.team.createService(teamInfo);
    this.ctx.body = result;
  }

  async queryByName(name){
    return await this.ctx.service.team.queryByNameService(name);
     
  }

  async updateName() {
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      id: Joi.string().required(),
      name: Joi.string().required()
  }), this.ctx.params);

   if(!!this.queryByName(reqBody.name)){
     return reply.err("已有此等级");
   }

    const result = await this.ctx.service.team.updateNameByIdService(reqBody.id, reqBody.name);
    this.ctx.body = result;
    return reply.success(result);
  }

  async delByName(){
    const Joi = this.app.Joi;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
      id: Joi.string().required()
  }), this.ctx.params);
  const result = await this.ctx.service.team.delNameById(reqBody.id);
  if(result){
    return reply.success(result);
  }

  }
 


}
module.exports = TeamController;



