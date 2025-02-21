const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log('Middleware 1 - before ------------------------>');
    await next();
    console.log('Middleware 1 - after');
});

app.use(async (ctx, next) => {
    console.log('Middleware 2 - before');
    ctx.body = 'Hello Middleware 2';
    await next();
    console.log('Middleware 2 - after');
});

app.use(async (ctx) => {
    console.log('Middleware 3 - final');
    ctx.body = 'Hello Koa';
});

app.listen(4000, () => console.log('koa Middleware Server started'));
