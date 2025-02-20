const { Controller } = require('egg');

class HomeController extends Controller {
  async index2() {
    const { ctx } = this;
    ctx.body = {
      message: 'hi, i am egg-framework',
    };
  }
}

module.exports = HomeController;
