'use strict';
import { Service } from 'egg'
import Wechat from '../helper/wechat'
import Type from '../const/type'
import reply from '../const/reply'

export class MailService extends Service {
    async update(id: string, type: string) {
        if (type == Type.mail.READ) {
            return await this.read(id);
        } else if (type == Type.mail.DRAW) {
            return await this.draw(id);
        }
        return reply.err('参数错误');
    }

    async read(id: string) {
        const result = await this.ctx.model.Mail.read(id);
        const mail = await this.ctx.model.Mail.findReadStatusById(id);
        if(mail[0] && mail[0].read ){
            return reply.success(mail);
        }
        return reply.err('没找到此消息');
    }

    async draw(id: string) {
        const result = await this.ctx.model.Mail.draw(id);
        const mail = await this.ctx.model.Mail.findDrawStatusById(id);
        if(mail[0] && mail[0].draw ){
            return reply.success(mail);
        }
        return reply.err('没找到此消息');
    }

}

module.exports = MailService;