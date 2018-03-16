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
};
