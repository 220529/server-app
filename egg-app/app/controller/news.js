// app/controller/news.js
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async listView() {
    const dataList = {
      list: [
        { id: 1, title: 'This is news 1', url: '/news/1' },
        { id: 2, title: 'This is news 2', url: '/news/2' },
      ],
    };
    await this.ctx.render('news/list.tpl', dataList);
  }
  async listRemote() {
    const ctx = this.ctx;
    const page = ctx.query.page || 1;
    const newsList = await ctx.service.news.list(page);
    await ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
