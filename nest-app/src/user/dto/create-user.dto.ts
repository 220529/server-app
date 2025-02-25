import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsOptional,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 8, {
    message:
      "The length must be between $constraint1 and $constraint2 characters.",
  })
  @ApiProperty({ description: "The username of the user" })
  public username: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "The password of the user" })
  public password: string;

  @IsEmail()
  @IsOptional() // 使 email 变为可选字段
  @ApiPropertyOptional({ description: "The email of the user" })
  public email: string;
}
