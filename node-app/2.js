function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// 测试单线程阻塞问题
console.time('CPU Task');
const result = fibonacci(50); // 故意用高耗计算
console.timeEnd('CPU Task');
console.log('Result:', result);

// 模拟一个并发的 HTTP 请求（会被阻塞）
const http = require('http');
http.createServer((req, res) => {
  res.end('Hello');
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});