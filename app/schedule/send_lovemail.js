'use strict';

const Subscription = require('egg').Subscription;
const MailComposer = require('nodemailer/lib/mail-composer');

class SendLovemail extends Subscription {
  static get schedule() {
    return {
      // cron: '0 0 7 * * *',
      interval: '5m', // 测试
      type: 'worker',
    };
  }

  async subscribe() {
    const { ctx, app } = this;
    const result = await ctx.service.v1.lovemail.findByIsStart();
    const toArrayList = [];
    const recipientVars = {};

    // 发送名单填充
    for (const e in result.rows) {
      toArrayList.push(result.rows[e].love_email);
      let weatherData = await app.redis.get('weatherChina').get(result.rows[e].love_city);
      let oneData = await app.redis.get('one').get(ctx.helper.random(15));
      weatherData = JSON.parse(weatherData);
      oneData = JSON.parse(oneData);

      recipientVars[result.rows[e].love_email] = {
        id: result.rows[e].id,
        imgUrl: oneData.imgUrl,
        oneMsg: oneData.content,
        nickname: result.rows[e].nickname,
        loveTimeInterval: ctx.helper.loveTimeInterval(result.rows[e].love_date),
        love_email: result.rows[e].love_email,
        love_msg: result.rows[e].love_msg,
        love_time: result.rows[e].love_time,
        love_color: result.rows[e].love_color,
        stateDetailed: weatherData.stateDetailed,
        weatherState: weatherData.state1,
        tem1: weatherData.tem2,
        tem2: weatherData.tem2,
      };
    }

    // 邮件发送配置
    const mailOptions = {
      from: ctx.app.config.mailgun.from,
      to: [ 'LOVE U <%recipient%>' ],
      subject: 'Hey, 亲爱的',
      html: await ctx.renderView(
        'template/email/one/temp.tpl',
        {
          data: {
            imgUrl: '%recipient.imgUrl%',
            oneMsg: '%recipient.oneMsg%',
            nickname: '%recipient.nickname%',
            loveTimeInterval: '%recipient.loveTimeInterval%',
            love_email: '%recipient.love_email%',
            love_msg: '%recipient.love_email%',
            love_time: '%recipient.love_email%',
            love_city: '%recipient.love_email%',
            love_color: '%recipient.love_email%',
            stateDetailed: '%recipient.stateDetailed%',
            weatherState: '%recipient.weatherState%',
            tem1: '%recipient.tem1%',
            tem2: '%recipient.tem2%',
          },
        }
      ),
      headers: {
        'X-Mailgun-Recipient-Variables': JSON.stringify(recipientVars),
      },
    };

    const mail = new MailComposer(mailOptions);

    mail.compile().build(async (err, message) => {
      const data = {
        to: toArrayList,
        message: message.toString('ascii'),
        'recipient-variables': recipientVars,
      };

      await ctx.app.mailgun.messages().sendMime(data);
    });
  }
}

module.exports = SendLovemail;
