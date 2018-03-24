import {UserService} from './app/service/user'
import {MailService} from './app/service/mail'
import {ActivityService} from './app/service/activity'
import {SmsService} from './app/service/sms'
import {RoleService} from './app/service/role'
import {TeamService} from './app/service/team'
import {ApplyCardsService} from './app/service/ApplyCards'
import * as Keyv from 'keyv'

import * as Joi from 'joi';

declare module "egg" { 
	interface IService {
    user:UserService,
    mail:MailService,
    activity:ActivityService,
    sms:SmsService,
    role:RoleService,
    team:TeamService,
    applyCards: ApplyCardsService
  }
  class Application {
    redis: any
    Joi: Joi
    jwt: any
    keyv: Keyv
  }

}

module.exports = app => {
  app.beforeStart(async () => {
    
  });
};