import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

import { toDto } from "../util/transformer";
import { UserDto } from "./dto/user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import {
  UserNotFoundException,
  UsernameAlreadyExistsException,
} from "../global/exception/user.exception";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建用户，添加查重逻辑
  async create(user: CreateUserDto): Promise<UserDto> {
    // 查重：根据 username 查找是否已有相同用户
    const existingUser = await this.findOneByCondition({
      username: user.username,
    });

    if (existingUser) {
      throw new UsernameAlreadyExistsException(user.username);
    }

    // 如果没有重复，则创建新用户
    const newUser = this.userRepository.create(user);
    const updatedUser = await this.userRepository.save(newUser);
    return toDto(updatedUser, UserDto);
  }

  async findAll({
    pageNo = 1, // 默认页码为 1
    pageSize = 10, // 默认每页 10 条
  }: {
    pageNo?: number;
    pageSize?: number;
  }) {
    // 使用 findAndCount 来获取分页数据和总数
    const [items, total] = await this.userRepository.findAndCount({
      skip: (pageNo - 1) * pageSize, // 跳过的条数
      take: pageSize, // 每页的条数
    });

    // 返回分页结果
    return {
      items: toDto(items, UserDto),
      total,
      pageNo,
      pageSize,
    };
  }

  findOneByCondition(where: Record<string, any>): Promise<User | null> {
    return this.userRepository.findOne({
      where,
      relations: [], // 这里可以根据需要配置关联查询
    });
  }

  async findOneById(id: number): Promise<UserDto> {
    const user = await this.findOneByCondition({ id });
    if (!user) {
      throw new UserNotFoundException(id);
    }
    return toDto(user, UserDto);
  }

  async update(id: number, userData: Partial<User>): Promise<UserDto> {
    const user = await this.findOneByCondition({ id });
    if (!user) throw new UserNotFoundException(id);

    this.userRepository.merge(user, userData);
    const updatedUser = await this.userRepository.save(user);
    return toDto(updatedUser, UserDto);
  }

  async delete(id: number): Promise<UserDto> {
    const user = await this.findOneByCondition({ id });
    if (!user) throw new UserNotFoundException(id);

    const deleteUser = await this.userRepository.remove(user);
    return toDto(deleteUser, UserDto);
  }
}
