import {
  Controller,
  Get,
  Delete,
  Post,
  Put,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

import { User } from "./entities/user.entity";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@ApiTags("user")
@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: "查询所有用户" })
  getUsers(
    @Query("pageNo") pageNo: number = 1,
    @Query("pageSize") pageSize: number = 10,
  ) {
    return this.userService.findAll({ pageNo, pageSize });
  }

  @Get(":id")
  @ApiOperation({ summary: "查询单个用户" })
  getUser(@Param("id", ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOneById(id);
  }

  @Post()
  @ApiOperation({ summary: "创建用户" })
  addUser(@Body() user: CreateUserDto): Promise<UserDto> {
    return this.userService.create(user);
  }

  @Put(":id")
  @ApiOperation({ summary: "更新用户" })
  updateUser(
    @Param("id") id: number,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, user as User);
  }

  @Delete(":id")
  @ApiOperation({ summary: "删除用户" })
  deleteUser(@Param("id") id: number): Promise<UserDto> {
    return this.userService.delete(id);
  }
}
