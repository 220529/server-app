const express = require("express");
const mysql = require("mysql2/promise"); // 使用 promise 版本

const app = express();
const port = 3000;

// 创建 MySQL 连接池（推荐生产环境使用）
const pool = mysql.createPool({
  host: "localhost", // 数据库地址
  port: 3307, // 数据库端口
  user: "root", // 数据库用户名
  password: "root", // 数据库密码
  database: "v1_base", // 数据库名
  waitForConnections: true,
  connectionLimit: 10, // 连接池大小
  queueLimit: 0,
});

// 定义路由
app.get("/users", async (req, res) => {
  try {
    // 打印当前内存使用情况
    const memoryUsage = process.memoryUsage();
    console.log(
      `Memory Usage: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`
    );
    // 从连接池获取连接
    const connection = await pool.getConnection();

    // 执行查询
    const [rows] = await connection.query("SELECT * FROM user LIMIT 10");

    // 释放连接回连接池
    connection.release();

    // 返回结果
    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed",
    });
  }
});

// 启动服务
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
