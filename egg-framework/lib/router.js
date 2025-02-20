// lib/router.js（框架 a 中的路由）
module.exports = app => {
    const { router, controller } = app;

    // 预设用户相关的路由
    router.get('/user/list', controller.user.list);  // 获取用户列表
    router.get('/user/detail/:id', controller.user.detail);  // 获取用户详情
};
