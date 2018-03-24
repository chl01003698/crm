'use strict';
import { Service } from 'egg'
import Wechat from '../helper/wechat'
import Type from '../const/type'
import reply from '../const/reply'

export class ActivityService extends Service {
    async update(id: string, type: string) {
        if (type == Type.activity.READ) {
            return await this.read(id);
        } else if (type == Type.activity.DRAW) {
            return await this.draw(id);
        }
        return reply.err('参数错误');
    }

    async read(id: string) {
        await this.ctx.model.Activity.read(id);
        const activity = await this.ctx.model.Activity.findReadStatusById(id);
        console.log('activity', activity);
        if (activity[0] && activity[0].read ) {
            return reply.success(activity);
        }
        return reply.err('没找到此活动');
    }

    async draw(id: string) {
        await this.ctx.model.Activity.draw(id);
        const activity = await this.ctx.model.Activity.findDrawStatusById(id);
        console.log('activity', activity);
        if (activity[0] && activity[0].draw ) {
            return reply.success(activity);
        }
        return reply.err('没找到此活动');
    }

}

module.exports = ActivityService;