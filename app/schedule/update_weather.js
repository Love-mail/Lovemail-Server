'use strict';

const Subscription = require('egg').Subscription;
const parseString = require('xml2js').parseString;

class UpdateWeather extends Subscription {
  static get schedule() {
    return {
      cron: '0 30 3 * * *',
      type: 'all',
    };
  }

  async subscribe() {
    const { ctx, app } = this;

    // 获取中国省份名称
    const chinaResult = await ctx.curl('http://flash.weather.com.cn/wmaps/xml/china.xml', {
      timeout: [ 1000, 30000 ],
      dataType: 'text',
    });

    // let provinceList = {};

    parseString(chinaResult.data, (err, result) => {
      result.china.city.forEach(async e => {
        // 排除没有天气数据的省
        if (e.$.pyName !== 'diaoyudao' && e.$.pyName !== 'nanshadao' && e.$.pyName !== 'xisha') {
          // provinceList[e['$'].quName] = {
          //   pyName: e['$'].pyName,
          // }

          // 获取城市天气信息
          const cityResult = await ctx.curl(`http://flash.weather.com.cn/wmaps/xml/${e.$.pyName}.xml`, {
            timeout: [ 1000, 30000 ],
            dataType: 'text',
          });

          parseString(cityResult.data, (err, result) => {
            result[e.$.pyName].city.forEach(async a => {
              await app.redis.get('weatherChina').set(
                a.$.cityname,
                JSON.stringify(a.$)
              );
            });
          });
        }
      });
    });
  }
}

module.exports = UpdateWeather;
