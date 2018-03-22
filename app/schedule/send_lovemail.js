'use strict';

const Subscription = require('egg').Subscription;
const MailComposer = require('nodemailer/lib/mail-composer');

class SendLovemail extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 7 * * *',
      // interval: '5m', // 测试
      type: 'worker',
    };
  }

  async subscribe() {
    const { ctx, app } = this;
    const result = await ctx.service.v1.lovemail.findByIsStart();

    if (result) {
      const toArrayList = [];
      const recipientVars = {};
      let essayData = await app.redis.get('tempData').get('essay');
      essayData = JSON.parse(essayData);

      // 发送名单填充
      for (const e in result.rows) {
        toArrayList.push(result.rows[e].love_email);
        let weatherData = await app.redis.get('weatherChina').get(result.rows[e].love_city);
        let oneData = await app.redis.get('tempData').get(ctx.helper.random(15));
        weatherData = JSON.parse(weatherData);
        oneData = JSON.parse(oneData);

        console.log(typeof result.rows[e].love_temp)

        recipientVars[result.rows[e].love_email] = {
          id: result.rows[e].id,
          // ONE · 一个图片
          imgUrl: oneData.imgUrl,
          // ONE · 一个一句话
          oneMsg: oneData.content,
          nickname: result.rows[e].nickname,
          loveTimeInterval: ctx.helper.loveTimeInterval(result.rows[e].love_date),
          love_email: result.rows[e].love_email,
          love_temp: result.rows[e].love_temp,
          love_time: result.rows[e].love_time,
          love_color: result.rows[e].love_color,
          // 天气数据
          stateDetailed: weatherData.stateDetailed,
          weatherState: weatherData.state1,
          tem1: weatherData.tem1,
          tem2: weatherData.tem2,
          // 文章数据
          essay_title: essayData.title,
          essay_author: essayData.author,
          essay_content: essayData.content,
        };
      }

      // 邮件发送配置
      const mailOptions = {
        from: ctx.app.config.mailgun.from,
        to: [ 'LOVE U <%recipient%>' ],
        subject: 'Hey, 亲爱的',
        html: await ctx.renderView(
          'template/email/temp.tpl',
          {
            data: {
              imgUrl: '%recipient.imgUrl%',
              oneMsg: '%recipient.oneMsg%',
              nickname: '%recipient.nickname%',
              loveTimeInterval: '%recipient.loveTimeInterval%',
              love_temp: '%recipient.love_temp%',
              love_email: '%recipient.love_email%',
              love_time: '%recipient.love_time%',
              love_city: '%recipient.love_city%',
              love_color: '%recipient.love_color%',
              stateDetailed: '%recipient.stateDetailed%',
              weatherState: '%recipient.weatherState%',
              tem1: '%recipient.tem1%',
              tem2: '%recipient.tem2%',
              essay_title: '%recipient.essay_title%',
              essay_author: '%recipient.essay_author%',
              essay_content: '%recipient.essay_content%',
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
}

module.exports = SendLovemail;
