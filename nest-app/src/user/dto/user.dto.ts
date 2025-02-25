// user.dto.ts
import { Expose, Exclude } from "class-transformer";

export class UserDto {
  @Expose() // 该字段将暴露给外部
  id: number;

  @Expose() // 该字段将暴露给外部
  username: string;

  @Exclude() // 标记 password 字段不返回
  password: string;

  @Expose() // 该字段将暴露给外部
  email: string;

  @Expose() // 该字段将暴露给外部
  roles: string[];

  @Expose() // 创建时间
  createdAt: Date;

  @Expose() // 更新时间
  updatedAt: Date;
}
