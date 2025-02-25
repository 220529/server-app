import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity("users") // 数据库表名
export class User {
  @PrimaryGeneratedColumn() // 自增 ID
  id: number;

  @Column({ length: 6 })
  username: string;

  @Column({ length: 6 })
  password: string;

  @Column({ default: "" })
  email: string;

  @Column({ type: "simple-array" })
  roles: number[] = [0];

  @CreateDateColumn() // 自动创建时间
  createdAt: Date;

  @UpdateDateColumn() // 自动更新时间
  updatedAt: Date;
}
