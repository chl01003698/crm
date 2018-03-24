'use strict';
import { Controller } from 'egg';
import reply from '../../const/reply';
import type from '../../const/type';


export class SigninController extends Controller {

    async test(){
        const findResult = await this.ctx.service.user.getReviewUser("13269526666");
        }

   async create(){
       const Joi = this.app.Joi;
       const model = this.ctx.model;
    //    const newUser = {
    //     userId: Joi.string().required(),
    //     password: Joi.string().min(6).required(),
    //     basicSalary: Joi.number().required(),
    //     roleName: Joi.string().required(),
    //     userName: Joi.string().required(),
    //     gender: Joi.number().required(),
    //     age: Joi.number().required(),
    //     identityCard: Joi.string().required(),
    //     province: Joi.string().required(),
    //     city: Joi.string().required(),
    //     wechatId: Joi.string().required()
    // }
    
    //    this.ctx.validate(Joi.object().keys(newUser), this.ctx.request.body);
       const reqBody = this.ctx.request.body as any;
     
       const findResult = await this.ctx.service.user.findUserInfoByUserId(reqBody.userId);
       
       if(!!findResult){
        this.ctx.body =reply.err('已有此用户');
        return ;
       }

       const newUserInfo = {
        userId: reqBody.userId,
        password: reqBody.password, 
        basicSalary: reqBody.basicSalary,
        roleName: reqBody.roleName,
        parentId: reqBody.parentId || "",  
        userName: reqBody.userName,
        gender: reqBody.gender,
        age: reqBody.age,
        identityCard: reqBody.identityCard,
        province: reqBody.province,
        city: reqBody.city,
        wechatId: reqBody.wechatId,
        teams: reqBody.teams
       }
       const result = await this.ctx.service.user.createUser(newUserInfo);
        this.ctx.body = result;
       
   }

  async signin() {
    const Joi = this.app.Joi;
    const model = this.ctx.model;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
        userId: Joi.string().required(),
        password: Joi.string().required()
    }), this.ctx.request.body);

    const result = await this.ctx.service.user.findUserInfoByUserIdAndPwd(reqBody.userId, reqBody.password);
    this.ctx.body = result;
  }

  async searchByNameOrId(){
      const Joi = this.app.Joi;
      const model = this.ctx.model;
      const reqBody = this.ctx.request.body as any;
      this.ctx.validate(Joi.object().keys({
          content: Joi.string().required()
      }), this.ctx.request.body);

      const filter = {
          $or:[
              {userName: {$regex: reqBody.content}},
              {userId: {$regex: reqBody.content}}
          ]
      }
      const userInfo = await model.CrmUser.findUser(filter);
      if(!userInfo.length){
        this.ctx.body = reply.err('没有符合条件的用户');
        return ;
      }
      this.ctx.body= userInfo;
  }

  async searchByProvinceOrLevel(){
    const Joi = this.app.Joi;
    const model = this.ctx.model;
    const reqBody = this.ctx.request.body as any;
    //TODO 验证reqBody.level
    const userInfo = await this.ctx.service.user.searchByProvinceOrLevel(reqBody.level, reqBody.province);
    if(!userInfo){
      this.ctx.body = reply.err('没有符合条件的用户');
      return ;
    }
    this.ctx.body= userInfo;
}

async queryUserById(){
    const Joi = this.app.Joi;
    const model = this.ctx.model;
    this.ctx.validate(Joi.object().keys({
        id: Joi.string().required()
    }), this.ctx.params);
    const params = this.ctx.params;
    const userInfo = await this.ctx.service.user.findUserInfoById(params.id);
    if(!userInfo){
        this.ctx.body = reply.err('没有此用户相关信息');
    }
    userInfo.increaseCuratorCount = 100,
    userInfo.performance = 200,
    userInfo.increaseDownloadCount = 300;
    this.ctx.body = userInfo;

}

async updateUserById(){
    const Joi = this.app.Joi;
    const model = this.ctx.model;
    const reqBody = this.ctx.request.body as any; 
    this.ctx.validate(Joi.object().keys({
        _id: Joi.string().required(),
        userName: Joi.string().required(),
        gender: Joi.number().required(),
        age: Joi.number().required(),
        identityCard: Joi.string().required(),
        province: Joi.string().required(),
        city: Joi.string().required(),
        wechatId: Joi.string().required()

    }), this.ctx.request.body);

    const updateInfo = {
        _id: reqBody._id,
        userName: reqBody.userName,
        gender: reqBody.gender,
        age: reqBody.age,
        identityCard: reqBody.identityCard,
        province: reqBody.province,
        city: reqBody.city,
        wechatId: reqBody.wechatId
    }
    const userInfo = await this.ctx.service.user.updateUserInfoById(reqBody._id, updateInfo);

    let result: any = {};
    if(!userInfo){  
         result = reply.err("更新失败");
         this.ctx.body = result;
    }
    this.ctx.body = reply.success(userInfo);
}

async freeze(){
    const Joi = this.app.Joi;
    const model = this.ctx.model;
    const reqBody = this.ctx.request.body as any;
    this.ctx.validate(Joi.object().keys({
        id: Joi.string().required(),
        status: Joi.number().integer().min(0).max(1).required()
    }),reqBody);

    const result = this.ctx.service.user.updateFreeze(reqBody.id, reqBody.status)
    this.ctx.body = reply.success(result);   

}


//TODO
async getFreeze(){
    console.log("-----getFreezeList----------")
 
   
    // const list = await this.ctx.service.user.getFreezeList();
    //this.ctx.body = reply.success({});
}



 

  


}
module.exports = SigninController;



