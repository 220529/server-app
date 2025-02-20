// lib/controller/user.js (框架 a 中的用户控制器)
const { Controller } = require('egg');

class UserController extends Controller {
    async list() {
        // 处理获取用户列表的逻辑
        this.ctx.body = { message: 'egg-app User list' };
    }

    async detail() {
        const { id } = this.ctx.params;
        // 处理获取用户详情的逻辑
        this.ctx.body = { message: `egg-app User details for ${id}` };
    }
}

module.exports = UserController;
