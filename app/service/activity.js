'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const type_1 = require("../const/type");
const reply_1 = require("../const/reply");
class ActivityService extends egg_1.Service {
    async update(id, type) {
        if (type == type_1.default.activity.READ) {
            return await this.read(id);
        }
        else if (type == type_1.default.activity.DRAW) {
            return await this.draw(id);
        }
        return reply_1.default.err('参数错误');
    }
    async read(id) {
        await this.ctx.model.Activity.read(id);
        const activity = await this.ctx.model.Activity.findReadStatusById(id);
        console.log('activity', activity);
        if (activity[0] && activity[0].read) {
            return reply_1.default.success(activity);
        }
        return reply_1.default.err('没找到此活动');
    }
    async draw(id) {
        await this.ctx.model.Activity.draw(id);
        const activity = await this.ctx.model.Activity.findDrawStatusById(id);
        console.log('activity', activity);
        if (activity[0] && activity[0].draw) {
            return reply_1.default.success(activity);
        }
        return reply_1.default.err('没找到此活动');
    }
}
exports.ActivityService = ActivityService;
module.exports = ActivityService;
