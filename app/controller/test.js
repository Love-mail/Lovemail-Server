'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;
    let ip = ctx.request.headers['x-forwarded-for'] ||
    ctx.request.ip ||
    ctx.request.connection.remoteAddress ||
    ctx.request.socket.remoteAddress ||
    ctx.request.connection.socket.remoteAddress || '';
    if(ip.split(',').length>0){
      ip = ip.split(',')[0]
    }

    ctx.body = {
      data: ip
    }
  }
}

module.exports = TestController;
