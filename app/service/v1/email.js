'use strict';

const Service = require('egg').Service;

class EmailService extends Service {
  /**
   * 发送邮件
   * @param {String} receiver - 邮件接收方
   * @param {String} title    - 邮件标题
   * @param {String} type     - 邮件类型
   * @param {String} userId   - 用户 ID
   * @return {void}
   */
  async send(receiver, title, type, userId) {
    const { ctx } = this;
    let template;

    if (type === 'validate') {
      template = await ctx.renderView(
        'template/email/validate.tpl',
        {
          data: {
            userId,
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
