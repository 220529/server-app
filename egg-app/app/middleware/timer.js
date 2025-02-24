module.exports = () => {
  return async function timer(ctx, next) {
    const start = Date.now(); // 记录开始时间
    await next(); // 继续执行后续中间件或控制器
    const duration = Date.now() - start; // 计算耗时
    ctx.set('X-Response-Time', `${duration}ms`); // 设置响应头
    ctx.logger.info(`[${ctx.method}] ${ctx.url} - ${duration}ms`); // 记录日志
  };
};
