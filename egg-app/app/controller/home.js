const { Controller } = require('egg');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      message: 'hi, egg',
      // ua: `Your UA is ${this.ctx.ua}`,
      isIOS: `app is ${this.ctx.isIOS}`,
      isChrome: `app is ${this.ctx.isChrome}`,
    };
  }
  async getFramework() {
    this.ctx.body = this.ctx.app.config.framework;
  }
}

module.exports = HomeController;
