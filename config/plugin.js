'use strict';

// 视图模板
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// Session
exports.session = {
  enable: false,
};

// Redis
exports.redis = {
  enable: true,
  package: 'egg-redis',
};

// Sequelize
exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// Validate
exports.validate = {
  enable: true,
  package: 'egg-validate',
};
