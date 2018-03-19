'use strict';

const Controller = require('egg').Controller;

class EmailController extends Controller {
  // 退订邮件
  async unsubscribe() {
    const { ctx } = this;
    const emailAddress = ctx.query.emailAddress;

    const isLoveEmail = await ctx.service.v1.lovemail.findByLovemail(emailAddress);

    if (isLoveEmail) {
      // 对象退订邮件通知
      ctx.runInBackground(async () => {
        await ctx.service.v1.email.send(
          isLoveEmail.email,
          ctx.__('Unsubscribe notification'),
          'unsubscribeNotification'
        );
      });
    }

    // 加入退订列表
    await ctx.app.mailgun.unsubscribes().create({
      address: emailAddress,
      tag: '*',
    });

    await ctx.render('template/email/unsubscribeFeed.tpl');
    ctx.status = 200;
  }
}

module.exports = EmailController;
