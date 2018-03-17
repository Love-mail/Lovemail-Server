'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  /**
   * 插入一条城市数据
   * @param {String} cityName - 城市名
   * @return {void}
   */
  async insertOne(cityName) {
    const { ctx } = this;

    await ctx.model.City.create({
      id: ctx.helper.uniqueId(),
      cityName,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });
  }

  /**
   * 读取全部城市数据
   * @return {Object} rsult - 查询结果
   */
  async findAll() {
    const { ctx } = this;

    const result = await ctx.model.City.findAndCountAll({
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });

    return result;
  }
}

module.exports = UserService;
