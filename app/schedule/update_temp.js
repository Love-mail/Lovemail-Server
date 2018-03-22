'use strict';

const Subscription = require('egg').Subscription;

class UpdateOne extends Subscription {
  static get schedule() {
    return {
      cron: '0 0 3 * * *',
      type: 'worker',
    };
  }

  async subscribe() {
    const { ctx, app } = this;
    const formTime = ctx.helper.formTime();
    // ONE · 一个 API
    const url_one = `http://v3.wufazhuce.com:8000/api/hp/bymonth/${formTime}%2000:00:00?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`;
    // 每日一文 API
    const url_essay = 'https://interface.meiriyiwen.com/article/random?dev=1';
    const result_one = await ctx.curl(url_one, {
      timeout: [ 10000, 300000 ],
      dataType: 'json',
    });

    const result_essay = await ctx.curl(url_essay, {
      timeout: [ 10000, 300000 ],
      dataType: 'json',
    });

    const data_one = result_one.data.data;
    const data_essay = result_essay.data.data;

    data_one.forEach(async (item, idx) => {
      await app.redis.get('tempData').set(
        idx,
        JSON.stringify({
          imgUrl: item.hp_img_url,
          content: item.hp_content,
        })
      );
    });

    await app.redis.get('tempData').set(
      'essay',
      JSON.stringify(data_essay)
    );
  }
}

module.exports = UpdateOne;
