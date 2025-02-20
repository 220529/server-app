/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/news', controller.news.list);
  router.get('/framework', controller.home.getFramework);

  // 引入框架 a 提供的通用路由
  // require('egg-framework/lib/router')(app);
};
