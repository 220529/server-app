const express = require('express');
const cors = require('cors');

const app = express();
const users = [{ id: 1, name: 'Alice', age: 25 }];

// 1. 处理 CORS
app.use(cors());

// 2. 解析请求体
app.use(express.json());

// 3. 记录请求日志 + 请求耗时
app.use((req, res, next) => {
    console.log(`➡️  [${req.method}] ${req.url}`);
    const start = Date.now();

    res.setHeader('X-Request-Start', `${start}ms`);

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⬅️  [${req.method}] ${req.url} - Status: ${res.statusCode} - ${duration}ms`);
    });

    next();
});

// 4. 异常处理中间件
app.use((err, req, res, next) => {
    console.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// 5. 路由
app.get('/', (req, res) => {
    res.send('Welcome to Express API!');
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.get('/error', (req, res, next) => {
    const err = new Error('User not found ...');
    err.status = 401;  // 设置错误状态
    next(err);  // 抛出错误到错误处理中间件
});

app.post('/users', (req, res) => {
    const { name, age } = req.body;
    if (!name || !age) {
        return res.status(400).json({ error: 'Name and age are required' });
    }
    const newUser = { id: users.length + 1, name, age };
    users.push(newUser);
    res.json(newUser);
});

const delay = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("is over")
        }, 2000)
    })
}

app.get('/delay', async (req, res) => {
    const e = await delay();
    res.send(e)
})

// 6. 启动服务器
const PORT = 7025;
app.listen(PORT, () => {
    console.log(`🚀 express Server running at http://localhost:${PORT}`);
});
