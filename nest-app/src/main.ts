import { NestFactory } from "@nestjs/core";
import { Logger } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "./global/validation/validate.pipe";
import { AnyExceptionsFilter } from "./global/filter/any-exception.filter";
// import { HttpExceptionFilter } from './global/filter/http-exception.filter';
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Cats example")
    .setDescription("The cats API description")
    .setVersion("1.0")
    .addTag("cats")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  // 全局注册异常过滤器
  app.useGlobalFilters(new AnyExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT ?? 3000;
  await app.listen(port, () => {
    Logger.log(`${port} nest 服务已启动...`);
  });
}
bootstrap();
