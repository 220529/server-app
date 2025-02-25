import { plainToClass } from "class-transformer";

// 通用转换函数，用于将普通对象转换为 DTO 类的实例
export function toDto<T>(entity: any, dtoClass: { new (): T }): T {
  return plainToClass(dtoClass, entity);
}
