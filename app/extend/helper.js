'use strict';

const uniqid = require('uniqid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports = {
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
};
