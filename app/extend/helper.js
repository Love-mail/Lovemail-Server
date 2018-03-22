'use strict';

const uniqid = require('uniqid');
const moment = require('moment');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
  // 格式化当前时间
  formTime() {
    return moment().format('YYYY-MM-DD');
  },

  // 生成 unique ID
  uniqueId() {
    return uniqid();
  },

  // 加密密码
  md5(password) {
    const md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
  },

  // 生成 Token
  generateToken(data) {
    return 'Bearer ' + jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, this.ctx.app.config.jwt.secret);
  },

  // 生成验证码
  generateCode() {
    let code = '';
    const selectChar = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];

    for (let i = 0; i < 10; i++) {
      const idx = Math.floor(Math.random() * 36);
      code += selectChar[idx];
    }

    return code;
  },

  // 随机数生成
  random(max) {
    return ~~(0 + Math.random() * max);
  },

  // 在一起时间间隔
  loveTimeInterval(time) {
    const pass = moment(time, 'YYYY-MM-DD');
    const now = moment(new Date(), 'YYYY-MM-DD');
    return now.diff(pass, 'days')
  },
};
