'use strict';
module.exports = appInfo => {
    const config = exports = {};
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1515399912006_4674';
    // config.middleware = [ 'errorHandler' ]
    config.security = {
        xframe: {
            enable: false,
        },
        csrf: {
            enable: false,
        },
    };
    config.cors = {
        credentials: true,
        enable: true,
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };
    config.multipart = {
        fileExtensions: ['.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov'],
    };
    config.onerror = {
        errorPageUrl: '/index.html#/exception/500',
        json(err, ctx) {
            ctx.body = {
                code: ctx.response.status,
                msg: err.message
            };
            ctx.status = ctx.response.status;
        },
        html(err, ctx) {
            // html hander
            const msgStr = err.message.toString();
            ctx.body = '{code:' + ctx.status + ',msg: ' + msgStr + '}';
            ctx.status = err.status;
        },
        notfound: {
            pageUrl: '/404.html',
        },
    };
    config.mongoose = {
        url: 'mongodb://127.0.0.1:27017/chess',
        options: {},
    };
    config.mongooseLogger = {
        debug: true,
        // custom formatter, optional
        formatter: function (meta) {
            const query = JSON.stringify(meta.query);
            const options = JSON.stringify(meta.options || {});
            return `db.getCollection('${meta.collectionName}').${meta.methodName}(${query}, ${options})`;
        },
    };
    config.redis = {
        clients: {
            session: {
                port: 6379,
                host: '127.0.0.1',
                password: '',
                db: 0
            }
        }
    };
    exports.sessionRedis = {
        name: 'session',
    };
    config.joi = {
        options: {},
        locale: {
            'zh-cn': {}
        },
        enable: true,
    };
    config.jwt = {
        enable: false,
        secret: 'd90289cc2e92c046b5f15f9a6ef747b9',
        match: '/api',
    };
    config.logrotator = {
        filesRotateByHour: [],
        hourDelimiter: '-',
        filesRotateBySize: [],
        maxFileSize: 50 * 1024 * 1024,
        maxFiles: 10,
        rotateDuration: 60000,
        maxDays: 31,
    };
    config.jayson = {
        host: 'localhost',
        port: 3003
    };
    config.keyv = {
        clients: {
            instance: {
                port: 6379,
                host: '127.0.0.1',
                password: '',
                db: 0,
                namespace: 'keyv',
                adapter: 'redis'
            }
        }
    };
    config.wechat = {
        appId: 'wxf9013690160d0cea',
        appSecret: 'd90289cc2e92c046b5f15f9a6ef747b9',
        tokenReqUrl: 'https://api.weixin.qq.com/sns/oauth2/access_token?',
        userReqUrl: 'https://api.weixin.qq.com/sns/userinfo?'
    };
    config.sms = {
        key: 'b38226f48679c7eab0cd6835cab0f0fc',
        minutes: 1,
        template: '【369互娱】您的手机验证码是#code#',
        registerTemplate: '',
    };
    config.coin = {
        card: 100,
    };
    config.user = {
        nickname: '测试',
        coin: {
            card: 100
        },
    };
    return config;
};
