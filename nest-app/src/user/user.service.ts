import {
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // 创建用户，添加查重逻辑
  async create(user: User): Promise<User> {
    // 查重：根据 username 查找是否已有相同用户
    const existingUser = await this.userRepository.findOne({
      where: { username: user.username }, // 只根据 username 查重
    });

    if (existingUser) {
      throw new ConflictException("Username already exists");
    }

    // 如果没有重复，则创建新用户
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findAll({
    pageNo = 1, // 默认页码为 1
    pageSize = 10, // 默认每页 10 条
  }: {
    pageNo?: number;
    pageSize?: number;
  }) {
    // 计算跳过的条数
    const skip = (pageNo - 1) * pageSize;

    // 使用 findAndCount 来获取分页数据和总数
    const [items, total] = await this.userRepository.findAndCount({
      select: ["id", "username"], // 选择返回的字段，可以根据需求进行调整
      skip, // 跳过的条数
      take: pageSize, // 每页的条数
    });

    // 返回分页结果
    return {
      items,
      total,
      pageNo,
      pageSize,
      totalPages: Math.ceil(total / pageSize), // 计算总页数
    };
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [], // 根据需要加入关联查询
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, user: User) {
    const oldUser = await this.findOneById(id);
    this.userRepository.merge(oldUser, user);
    // 联合模型更新，需要使用save
    return this.userRepository.save(oldUser);
  }

  async delete(id: number) {
    const user = await this.findOneById(id);
    return this.userRepository.remove(user);
  }
}
