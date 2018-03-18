'use strict';

const Service = require('egg').Service;

class EmailService extends Service {
  /**
   * 发送邮件
   * @param {String} receiver - 邮件接收方
   * @param {String} title    - 邮件标题
   * @param {String} type     - 邮件类型
   * @param {String} code     - 邮箱验证码
   * @return {void}
   */
  async send(receiver, title, type, code) {
    const { ctx } = this;
    let template;

    if (type === 'validate') {
      template = await ctx.renderView(
        'template/email/validate.tpl',
        {
          data: {
            code,
          },
        }
      );
    }

    if (type === 'resetPass') {
      template = await ctx.renderView(
        'template/email/reset.tpl',
        {
          data: {
            code,
          },
        }
      );
    }

    const mailOptions = {
      from: ctx.app.config.mailgun.from,
      to: receiver,
      subject: title,
      html: template,
    };

    await ctx.app.mailgun.messages().send(mailOptions);
  }
}

module.exports = EmailService;
