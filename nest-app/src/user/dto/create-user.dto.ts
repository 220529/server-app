import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, Length } from "class-validator";

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
  @ApiProperty({ description: "The email of the user" })
  public email: string;
}
