'use strict';

const Service = require('egg').Service;

class TempService extends Service {
  /**
   * 插入一条模板数据
   * @param {String} tempName - 模板名称
   * @return {void}
   */
  async insertOne(tempName) {
    const { ctx } = this;

    await ctx.model.Template.create({
      id: ctx.helper.uniqueId(),
      tempName,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    });
  }

  /**
   * 读取全部模板数据
   * @return {Object} rsult - 查询结果
   */
  async findAll() {
    const { ctx } = this;

    const result = await ctx.model.Template.findAndCountAll({
      order: [
        [ 'updated_at', 'DESC' ],
      ],
    });

    return result;
  }
}

module.exports = TempService;
