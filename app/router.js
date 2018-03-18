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
  router.post('/v1/signup/email', controller.v1.user.signupEmail);
  router.post('/v1/signin', controller.v1.user.signin);

  // 用户
  router.post('/v1/user/reset/email', controller.v1.user.resetPassEmail);
  router.patch('/v1/user/reset', controller.v1.user.resetPass);

  // 城市列表
  router.get('/v1/city/all', controller.v1.city.index);
};
