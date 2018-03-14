'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class EmailService extends Service {
  /**
   * 发送邮件
   * @param {String} sender   - 邮件发送方
   * @param {String} receiver - 邮件接收方
   * @param {String} title    - 邮件标题
   * @param {String} type     - 邮件类型
   * @return {void}
   */
  async send(sender, receiver, title, type) {
    const { ctx } = this;

    const transporter = nodemailer.createTransport({
      service: ctx.app.config.email.service,
      port: ctx.app.config.email.port,
      secureConnection: ctx.app.config.email.secureConnection,
      auth: {
        user: ctx.app.config.email.auth.user,
        pass: ctx.app.config.email.auth.pass,
      },
    });

    let template;

    if (type === 'validate') {
      template = await ctx.renderView('template/email/validate.tpl');
    }

    const mailOptions = {
      from: sender,
      to: receiver,
      subject: title,
      html: template,
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
