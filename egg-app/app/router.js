/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/robot', controller.home.robot);
  router.get('/news', controller.news.listView);
  router.get('/news/remote', controller.news.listRemote);
};
