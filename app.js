'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    await app.model.sync({ force: false });
    await app.runSchedule('send_lovemail');
    // await app.runSchedule('update_one');
    // await app.runSchedule('update_weather');

    app.mailgun = require('mailgun-js')({
      apiKey: app.config.mailgun.apiKey,
      domain: app.config.mailgun.domain,
    });
  });
};
