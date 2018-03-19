'use strict';

const Controller = require('egg').Controller;

class TempController extends Controller {
  // 全部模板列表
  async index() {
    const { ctx } = this;

    const result = await ctx.service.v1.template.findAll();

    ctx.body = {
      data: result,
    };
    ctx.status = 200;
  }
}

module.exports = TempController;
