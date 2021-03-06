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
    // domainWhiteList: [ 'http://localhost:8000' ],
  }

  config.cors = {
    credentials:true,
    enable: true,
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  }

  config.onerror = {
    errorPageUrl: '/index.html#/exception/500',
    json(err, ctx) {
      ctx.body = {
        code: ctx.response.status,
        msg: err.message
      }
      ctx.status = ctx.response.status
    },
    html(err, ctx) {
      // html hander
      const msgStr = err.message.toString();
      ctx.body = '{code:'+ctx.status + ',msg: ' + msgStr + '}';
      ctx.status = err.status;
    },
    notfound: {
      pageUrl: '/404.html',
    },
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/chess',
    options: {
      // useMongoClient: true,
      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      // bufferMaxEntries: 0,
    },
  }

  config.mongooseLogger = {
    debug: true,
    // custom formatter, optional
    formatter: function(meta) {
      const query = JSON.stringify(meta.query);
      const options = JSON.stringify(meta.options || {});
      return `db.getCollection('${meta.collectionName}').${meta.methodName}(${query}, ${options})`;
    },
  };

  config.redis = {
    clients: {
      session: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0
      }
    }
  };

  exports.sessionRedis = {
    name: 'session', // specific instance `session` as the session store
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
  }

  config.logrotator = {
    filesRotateByHour: [],           // list of files that will be rotated by hour
    hourDelimiter: '-',              // rotate the file by hour use specified delimiter
    filesRotateBySize: [],           // list of files that will be rotated by size
    maxFileSize: 50 * 1024 * 1024,   // Max file size to judge if any file need rotate
    maxFiles: 10,                    // pieces rotate by size
    rotateDuration: 60000,           // time interval to judge if any file need rotate
    maxDays: 31,                     // keep max days log files, default is `31`. Set `0` to keep all logs
  };

  config.jayson = {
    host: 'localhost',
    port: 3003
  }

  config.keyv = {
    clients: {
      instance: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
        namespace: 'keyv',
        adapter: 'redis'
      }
    }
  };

  config.wechat = {
    appId:'wxf9013690160d0cea', 
    appSecret:'d90289cc2e92c046b5f15f9a6ef747b9',
    tokenReqUrl:'https://api.weixin.qq.com/sns/oauth2/access_token?',
    userReqUrl:'https://api.weixin.qq.com/sns/userinfo?'
  }

  config.sms = {
    key:'b38226f48679c7eab0cd6835cab0f0fc',
    minutes:1,
    template:'【369互娱】您的手机验证码是#code#',
    registerTemplate:'',
  }

  config.coin ={
    card:100,
  }

  config.user = {
    nickname:'测试',
    coin:{
      card:100
    },
  }

      //keen.io 埋点统计
      config.keenio = {
        agentId: '5a6fe2e7c9e77c00011f78ff',
        agentWriteKey: 'DDCF78621EEDC29DDCCE9C8B87C28527190C26FBA0DFEBBD80855F76039D6D8D4BF9F5D78788AE7AC8D3F5B28EFDF89A92EC91B1B9789FB10AE96647315414FE08789DE9A7F7D69DAF462BAFAEC7B4C82FE7409489183AE35296F5DE01C11DE2',
        chesstId: '5a7169edc9e77c00011f7a15',
        chessReadKey: '3C0B01A46022DB0AFF8F416D88D5C0891402914BC31D3EE3B8831DA5D4B681D5A534F358F3A35706CA49246628D0207EC8E49AB66564C57BAEC42E395A2F72CF2B3067429543D797C2D5E85A65A70A97E61D6F8CD43F1EC3A6FCD432E2E828BE',
    };

  return config;
};
