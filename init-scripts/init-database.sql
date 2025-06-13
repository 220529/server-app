-- 创建数据库(如果不存在)并指定字符集
CREATE DATABASE IF NOT EXISTS test_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE test_db;

-- 设置连接字符集
SET NAMES 'utf8mb4';

-- 创建用户表并指定字符集
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入测试数据
INSERT INTO user (username, email, password) VALUES
('张三', 'zhangsan@example.com', 'password123'),
('李四', 'lisi@example.com', 'securepass456');

-- 查询所有用户数据
SELECT * FROM user;