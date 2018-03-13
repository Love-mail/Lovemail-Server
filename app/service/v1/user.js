'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 插入一条数据
   * @param {Object}  model  - 响应主体模型
   * @return {Object} result - 被插入数据信息
   */
  async insertOne(model) {
    const { ctx } = this;

    const result = await ctx.model.User.create({
      id: ctx.helper.uniqueId(),
      email: model.email,
      password: model.password,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });

    return result;
  }
}

module.exports = UserService;
