import * as moment from 'moment'
const qs = require('querystring');

// 格式化时间
exports.formatTime = time => moment(time).format('YYYY-MM-DD hh:mm:ss')

// 处理成功响应
exports.success = ({ ctx, res = null, msg = '请求成功' }) => {
  ctx.body = {
    code: 0,
    data: res,
    msg
  }
  ctx.status = 200
}

exports.randomCode = function () {
  let num = '';
  for (var i = 0; i < 6; i++) {
    num = num + Math.floor(Math.random() * 10);
  }
  return num;
}

exports.app = function(){
  return this.app;
}