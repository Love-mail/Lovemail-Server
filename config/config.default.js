'use strict';

/**
 * 默认配置
 * @param  {Object} appInfo - 应用信息
 * @return {Object} config  - 默认配置项
 */
module.exports = appInfo => {
  const config = exports = {};

  // app key
  config.keys = appInfo.name;

  // favicon
  config.siteFile = {
    '/favicon.ico': '/public/favicon.ico',
  }

  // 中间件
  config.middleware = [
    'errorHandler',
    'responseHandler',
    'jwt',
  ];

  // 返回格式处理中间件
  config.responseHandler = {
    enable: true,
    ignore: [
      '/docs',
      '/v1/unsubscribe'
    ],
  };

  // 国际化
  config.i18n = {
    defaultLocale: 'zh-CN',
    queryField: 'lang',
    cookieField: 'lang',
    cookieMaxAge: '1y',
  };

  // 鉴权中间件
  config.jwt = {
    enable: true,
    key: 'user',
    ignore: [
      '/v1/signin',
      '/v1/signup',
      '/docs',
      '/v1/email/validate',
      '/v1/user/reset',
      '/v1/unsubscribe'
    ],
  };

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

  // Sequelize
  config.sequelize = {
    dialect: 'mysql',
    database: 'Lovemail',
    host: '127.0.0.1',
    port: '3306',
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
  };

  // Redis
  config.redis = {
    clients: {
      validateCode: {
        port: 6379,
        host: '127.0.0.1',
        db: 0,
      },
      emailLimit: {
        port: 6379,
        host: '127.0.0.1',
        db: 1,
      },
      one: {
        port: 6379,
        host: '127.0.0.1',
        db: 2,
      },
      weatherChina: {
        port: 6379,
        host: '127.0.0.1',
        db: 3,
      },
      setEmailLimit: {
        port: 6379,
        host: '127.0.0.1',
        db: 4,
      },
    },
  };

  // 阿里云 Node.js 性能平台
  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
  };

  // 静态文件服务
  config.static = {
    maxAge: 60,
  };

  // Proxy
  config.proxy = true;

  return config;
};
