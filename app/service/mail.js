'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const type_1 = require("../const/type");
const reply_1 = require("../const/reply");
class MailService extends egg_1.Service {
    async update(id, type) {
        if (type == type_1.default.mail.READ) {
            return await this.read(id);
        }
        else if (type == type_1.default.mail.DRAW) {
            return await this.draw(id);
        }
        return reply_1.default.err('参数错误');
    }
    async read(id) {
        const result = await this.ctx.model.Mail.read(id);
        const mail = await this.ctx.model.Mail.findReadStatusById(id);
        if (mail[0] && mail[0].read) {
            return reply_1.default.success(mail);
        }
        return reply_1.default.err('没找到此消息');
    }
    async draw(id) {
        const result = await this.ctx.model.Mail.draw(id);
        const mail = await this.ctx.model.Mail.findDrawStatusById(id);
        if (mail[0] && mail[0].draw) {
            return reply_1.default.success(mail);
        }
        return reply_1.default.err('没找到此消息');
    }
}
exports.MailService = MailService;
module.exports = MailService;
