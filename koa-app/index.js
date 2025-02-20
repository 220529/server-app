const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

// 1. 异常处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = { error: err.message || 'Internal Server Error' };
        console.error(`Error: ${err.message}`);
    }
});

// 2. 记录请求日志
app.use(async (ctx, next) => {
    console.log(`➡️  [${ctx.method}] ${ctx.url}`);
    await next();
    console.log(`⬅️  [${ctx.method}] ${ctx.url} - Status: ${ctx.status}`);
});

// 3. 记录请求耗时
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const duration = Date.now() - start;
    ctx.set('X-Response-Time', `${duration}ms`);
    console.log(`[⏳ ${ctx.method}] ${ctx.url} - ${duration}ms`);
});

// 4. 解析请求体
app.use(bodyParser());

// 5. 处理 CORS
app.use(cors());

// 6. 简单的测试路由
const users = [
    { id: 1, name: 'Alice', age: 25 },
];
router.get('/', async ctx => {
    ctx.body = 'Welcome to Koa API!';
});

router.get('/users', async ctx => {
    ctx.body = users;
});

router.post('/users', async ctx => {
    const { name, age } = ctx.request.body;
    if (!name || !age) {
        ctx.status = 400;
        ctx.body = { error: 'Name and age are required' };
        return;
    }
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    ctx.body = newUser;
});

// 7. 使用路由
app.use(router.routes()).use(router.allowedMethods());

// 8. 启动服务器
const PORT = 7015;
app.listen(PORT, () => {
    console.log(`🚀 koa Server running at http://localhost:${PORT}`);
});
