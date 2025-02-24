const { Controller } = require('egg');
const record = require('../../mock/record.json');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async robot() {
    const { ctx } = this;
    ctx.body = {
      message: 'hi, robot',
      data: [record, record, record, record],
    };
  }
}

module.exports = HomeController;
