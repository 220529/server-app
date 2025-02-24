import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatModule } from './cat/cat.module';

@Module({
  imports: [CatModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 全局注册中间件
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
