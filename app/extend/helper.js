'use strict';

const uniqid = require('uniqid');

module.exports = {
  // 生成 unique ID
  uniqueId() {
    return uniqid();
  },
};
