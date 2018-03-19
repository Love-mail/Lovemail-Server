'use strict';

const Controller = require('egg').Controller;

class EmailController extends Controller {
  // 退订邮件
  async unsubscribe() {
    const { ctx } = this;
    const emailAddress = ctx.request.query;

    const result = await ctx.app.mailgun.unsubscribes().create({
      address: emailAddress,
      tag: '*'
    });

    await ctx.render('template/email/unsubscribeFeed.tpl')
    ctx.status = 200;
  }
}

module.exports = EmailController;
