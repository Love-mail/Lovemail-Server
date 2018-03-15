'use strict';

const Controller = require('egg').Controller;
const requestIp = require('request-ip');

class TestController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.body = {
      data: requestIp.getClientIp(ctx.request)
    }
  }
}

module.exports = TestController;
