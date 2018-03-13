'use strict';

const Controller = require('egg').Controller;

class DocsController extends Controller {
  /**
   * 模板渲染
   */
  async index() {
    const { ctx } = this;

    ctx.body = await ctx.renderView('docs/docs.tpl');
    ctx.status = 200;
  }
}

module.exports = DocsController;
