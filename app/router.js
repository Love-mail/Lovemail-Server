'use strict';

/**
 * 路由
 * @param {Egg.Application} app - egg 应用
 */
module.exports = app => {
  const { router, controller } = app;

  // 文档
  router.get('/docs', controller.docs.index);

  // 鉴权
  router.post('/v1/signup', controller.v1.user.signup);
  router.post('/v1/signin', controller.v1.user.signin);
  router.get('/v1/user/validate', controller.v1.user.validate);
};
