'use strict';

const Controller = require('egg').Controller;

class CityController extends Controller {
  async index() {
    const { ctx } = this;

    const result = await ctx.service.v1.city.findAll();
    const resource = result.rows.map((e) => {
      return e.cityName
    })
    const uniqueResult = [...new Set(resource)]

    ctx.body = {
      data: {
        count: uniqueResult.length,
        content: uniqueResult
      }
    }
    ctx.status = 200;
  }
}

module.exports = CityController;
