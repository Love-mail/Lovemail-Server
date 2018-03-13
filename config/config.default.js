'use strict';

/**
 * 默认配置
 * @return {Object} config  - 默认配置项
 */
module.exports = () => {
  const config = exports = {};

  // 视图
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // 安全
  config.security = {
    methodnoallow: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  };

  // 中间件
  config.middleware = [];

  return config;
};
