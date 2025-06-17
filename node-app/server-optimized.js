const express = require("express");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

// 1. 优化 MySQL 连接池配置
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "v1_base",
  connectionLimit: 50, // 根据 MySQL max_connections 调整
  waitForConnections: true,
  queueLimit: 0,
  enableKeepAlive: true, // 保持长连接
  keepAliveInitialDelay: 0,
});

// 2. 性能监控中间件（含按需内存统计）
app.use((req, res, next) => {
  const start = Date.now();
  const startMemory = process.memoryUsage().rss; // 记录起始内存

  res.on("finish", () => {
    const duration = Date.now() - start;
    const memoryUsed =
      (process.memoryUsage().rss - startMemory) / (1024 * 1024);

    // 仅在高延迟或内存异常时输出日志（避免频繁打印）
    if (duration > 300 || memoryUsed > 10) {
      console.log(
        `[${req.method}] ${req.url} - ${res.statusCode} (${duration}ms, Memory: +${memoryUsed.toFixed(2)} MB)`
      );
    }
  });
  next();
});

// 3. 定期输出内存状态（每30秒一次，避免影响性能）
setInterval(() => {
  const memory = process.memoryUsage();
  console.log(`[Memory] RSS: ${(memory.rss / 1024 / 1024).toFixed(2)} MB`);
}, 1 * 1000);

// 4. 优化路由
app.get("/users", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, username FROM user LIMIT 10"
    );
    connection.release();
    res.json({ data: rows });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

// 5. 优雅关闭
process.on("SIGTERM", async () => {
  console.log("Shutting down gracefully...");
  await pool.end();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
