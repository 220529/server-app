// user.dto.ts
import { Exclude } from "class-transformer";

export class UserDto {
  @Exclude() // 不暴露这个字段
  password: string;
}
