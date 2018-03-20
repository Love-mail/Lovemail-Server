'use strict';

const Controller = require('egg').Controller;

class CityController extends Controller {
  // 全部城市列表
  async index() {
    const { ctx } = this;

    const result = await ctx.service.v1.city.findAll();
    const resource = result.rows.map(e => {
      return e.cityName;
    });
    // 去除重复城市（气象局 api bug）
    const uniqueResult = [ ...new Set(resource) ];

    ctx.body = {
      data: {
        count: uniqueResult.length,
        rows: uniqueResult,
      },
    };
    ctx.status = 200;
  }
}

module.exports = CityController;
