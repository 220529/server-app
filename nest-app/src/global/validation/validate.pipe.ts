import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    // 将普通对象转换成类实例
    const object = plainToInstance(metatype, value);

    // 进行验证
    const errors = await validate(object);
    if (errors.length > 0) {
      // 解析错误信息
      const errorMessages = errors.map((err) => ({
        property: err.property, // 发生错误的字段
        constraints: err.constraints, // 失败的具体原因
      }));

      throw new BadRequestException({ errors: errorMessages });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
