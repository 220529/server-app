const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// 配置项
const config = {
  port: 3000,
  env: process.env.NODE_ENV || "development",
};

// 路由表
const routes = {
  "/": (data, callback) => {
    console.log("Welcome to Node.js Service!!!");
    callback(200, { message: "Welcome to Node.js Service" });
  },
  "/hello": (data, callback) => {
    callback(200, {
      message: `Hello ${data.query.name || "World"}!`,
      timestamp: Date.now(),
    });
  },
  404: (data, callback) => {
    callback(404, { error: "Not Found" });
  },
};

// 创建 HTTP 服务
const server = http.createServer((req, res) => {
  // 1. 解析请求
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const query = parsedUrl.query;
  const headers = req.headers;

  // 2. 获取请求体
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", (chunk) => {
    buffer += decoder.write(chunk);
  });

  req.on("end", () => {
    buffer += decoder.end();

    // 3. 构造请求数据对象
    const requestData = {
      path,
      method,
      query,
      headers,
      payload: buffer ? JSON.parse(buffer) : {},
    };

    // 4. 路由处理
    const chosenHandler = routes[`/${path}`] || routes["404"];

    // 5. 返回响应
    chosenHandler(requestData, (statusCode = 200, responseData = {}) => {
      const payloadString = JSON.stringify(responseData);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // 6. 打印访问日志（调试时可观察）
      console.log(`${method.toUpperCase()} /${path}`, statusCode);
    });
  });
});

// 启动服务
server.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
  console.log(`Debug URL: ws://127.0.0.1:9229`);
});

// 错误处理
server.on("error", (err) => {
  console.error("Server error:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});
