'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 注册一个用户
   * @param {Object}  model  - 响应主体模型
   * @return {void}
   */
  async insertOne(model) {
    const { ctx } = this;

    await ctx.model.User.create({
      id: ctx.helper.uniqueId(),
      email: model.email,
      password: ctx.helper.md5(model.password),
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });
  }

  /**
   * 登录一个用户
   * @param {Object}  model  - 响应主体模型
   * @return {Object} result - 登录结果
   */
  async findBySignin(model) {
    const { ctx } = this;

    const user = await ctx.model.User.findOne({
      where: {
        email: model.email,
      },
    });

    if (user) {
      return ctx.helper.md5(model.password) === user.password
        ? user
        : false;
    }

    return false;
  }

  /**
   * 邮箱查询一个用户
   * @param {Object}  email  - 用户邮箱
   * @return {Object} result - 查询结果
   */
  async findByEmail(email) {
    const { ctx } = this;

    const result = await ctx.model.User.findOne({
      where: {
        email,
      },
    });

    return result;
  }

  /**
   * 用户 ID 查询一个用户
   * @param {Object}  id     - 用户 ID
   * @return {Object} result - 查询结果
   */
  async findById(id) {
    const { ctx } = this;

    const result = await ctx.model.User.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  /**
   * 用户邮箱验证
   * @param {String}   userId - 用户 ID
   * @return {Boolean} result - 验证结果
   */
  async validate(userId) {
    const { ctx } = this;

    const validateUser = await ctx.service.v1.user.findById(userId);

    if (validateUser) {
      await ctx.model.User.update({
        email_validate: true,
        updated_at: new Date().toLocaleString(),
      }, {
        where: {
          id: userId,
        },
      });

      return true;
    }

    return false;
  }
}

module.exports = UserService;
