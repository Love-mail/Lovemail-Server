'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    await app.model.sync({ force: false });
    // await app.runSchedule('update_one');
    // await app.runSchedule('update_weather');

    app.mailgun = require('mailgun-js')({
      apiKey: app.config.mailgun.api_key,
      domain: app.config.mailgun.domain,
    });
  });
};
