'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const qs = require('querystring');
exports.default = {
    async getToken(code, ctx, config) {
        console.log('config', config);
        let params = {
            appid: config.appId,
            secret: config.appSecret,
            code: code,
            grant_type: 'authorization_code'
        };
        let options = {
            method: 'Get',
            dataType: 'json'
        };
        let url = config.tokenReqUrl + qs.stringify(params);
        const response = await ctx.curl(url, options);
        const res = response.res;
        if (res.statusCode == 200) {
            const data = res.data;
            if (!data.errcode) {
                let body = await this.getUserInfo(data.access_token, data.openid, ctx, config);
                return body;
            }
            else {
                let body = { code: data.errcode, msg: data.errmsg };
                return body;
            }
        }
    },
    async getUserInfo(accessToken, openId, ctx, config) {
        let params = {
            access_token: accessToken,
            openid: openId,
            lang: 'zh_CN'
        };
        let options = { method: 'GET', dataType: 'json' };
        let url = config.userReqUrl + qs.stringify(params);
        const response = await ctx.curl(url, options);
        const res = response.res;
        if (res.statusCode == 200) {
            const data = res.data;
            if (data.error == undefined) {
                let body = { code: 0, msg: 'ok', data: data };
                return body;
            }
            else {
                let body = { code: data.errcode, msg: data.errmsg };
                return body;
            }
        }
    }
};
