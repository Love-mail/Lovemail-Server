'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 注册一个用户
   * @param {Object}  model  - 响应主体模型
   * @return {Object} result - 注册用户信息
   */
  async insertOne(model) {
    const { ctx } = this;

    const result = await ctx.model.User.create({
      id: ctx.helper.uniqueId(),
      email: model.email,
      password: ctx.helper.md5(model.password),
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });

    return result;
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
   * @param {String}  email  - 用户邮箱
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
   * @param {String}  id     - 用户 ID
   * @return {Object} result - 查询结果
   */
  async findById(id) {
    const { ctx } = this;

    const result = await ctx.model.User.findOne({
      attributes: {
        exclude: [ 'password' ],
      },
      where: {
        id,
      },
    });

    return result;
  }

  /**
   * 用户 ID 更新密码
   * @param {String}  id      - 用户 ID
   * @param {String}  newPass - 用户新密码
   * @return {void}
   */
  async updatePass(id, newPass) {
    const { ctx } = this;

    await ctx.model.User.update({
      password: ctx.helper.md5(newPass),
    }, {
      where: {
        id,
      },
    });
  }

  /**
   * 用户通过验证
   * @param {String} id - 用户 ID
   * @return {void}
   */
  async validated(id) {
    const { ctx } = this;

    await ctx.model.User.update({
      email_validate: true,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = UserService;
