'use strict';

module.exports = app => {
  app.beforeStart(async () => {
    await app.model.sync({ force: false });

    app.mailgun = require('mailgun-js')({
      apiKey: app.config.mailgun.api_key,
      domain: app.config.mailgun.domain,
    });
  });
};
