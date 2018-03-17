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
    const url = `http://v3.wufazhuce.com:8000/api/hp/bymonth/${formTime}%2000:00:00?channel=wdj&version=4.0.2&uuid=ffffffff-a90e-706a-63f7-ccf973aae5ee&platform=android`;
    const result = await ctx.curl(url, {
      timeout: [ 10000, 300000 ],
      dataType: 'json',
    });

    const data = result.data.data;

    data.forEach(async (item, idx) => {
      await app.redis.get('one').set(
        idx,
        JSON.stringify({
          imgUrl: item.hp_img_url,
          content: item.hp_content,
        })
      );
    });
  }
}

module.exports = UpdateOne;
