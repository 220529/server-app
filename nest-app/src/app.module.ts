import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";

import { LoggerMiddleware } from "./global/middleware/logger.middleware";
import { CatModule } from "./cat/cat.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    CatModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: "mysql",
          host: configService.get<string>("HOST"),
          port: configService.get<number>("DB_PORT"),
          username: configService.get<string>("ROOT_NAME"),
          password: configService.get<string>("ROOT_PASSWORD"),
          database: configService.get<string>("MYSQL_DATABASE"),
          entities: [__dirname + "/**/*.entity{.ts,.js}"], // 存储库模式：user.entity.ts
          synchronize: true,
          retryAttempts: 5, // 设置重试次数
          retryDelay: 1000, // 设置重试延迟（毫秒）
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 全局注册中间件
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
