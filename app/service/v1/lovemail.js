'use strict';

const Service = require('egg').Service;

class LovemailService extends Service {
  /**
   * 保存用户 Lovemail 设置
   * @param {String} id    - 用户 ID
   * @param {Object} model - 响应主体模型
   * @return {void}
   */
  async save(id, model) {
    const { ctx, app } = this;

    // 设置 24 小时内无法重新设置对象邮箱
    await app.redis.get('setEmailLimit').set(id, 'limit', 'EX', 60 * 60 * 24);

    await ctx.model.User.update(model, {
      where: {
        id,
      },
    });
  }

  /**
   * 更新用户 Lovemail 设置
   * @param {String} id    - 用户 ID
   * @param {Object} model - 响应主体模型
   * @return {void}
   */
  async update(id, model) {
    const { ctx, app } = this;

    if (model.love_email) {
      // 设置 24 小时内无法重新设置对象邮箱
      await app.redis.get('setEmailLimit').set(id, 'limit', 'EX', 60 * 60 * 24);
    }

    await ctx.model.User.update(model, {
      where: {
        id,
      },
    });
  }

  /**
   * 查询对象 email 绑定情况
   * @param {String} email    - 对象 email
   * @return {Object} result  - 查询结果
   */
  async findByLovemail(email) {
    const { ctx } = this;

    const result = await ctx.model.User.findOne({
      where: {
        love_email: email,
      },
    });

    return result;
  }

  /**
   * 查询 lovemail 服务对象
   * @return {Object} result - 查询结果
   */
  async findByIsStart() {
    const { ctx } = this;

    const result = await ctx.model.User.findAndCountAll({
      attributes: {
        exclude: [ 'password' ],
      },
      where: {
        isStart: true,
      },
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });

    return result;
  }

  /**
   * 解绑对象邮箱
   * @param {String} id - 用户 ID
   * @return {void}
   */
  async untie(id) {
    const { ctx, app } = this;

    await app.redis.get('setEmailLimit').set(id, 'limit', 'EX', 60 * 60 * 24);

    await ctx.model.User.update({
      love_email: null,
      isStart: false,
    }, {
      where: {
        id,
      },
    });
  }
}

module.exports = LovemailService;
