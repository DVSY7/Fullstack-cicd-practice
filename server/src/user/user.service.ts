import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { Redis } from 'ioredis';
import { REDIS_CLIENT } from '../redis.module';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(REDIS_CLIENT)
    private redisClient: Redis,
  ) { }

  // 생성
  async create(name: string) {
    await this.redisClient.del('users'); // 캐시 초기화
    const user = this.userRepository.create({ name });
    return this.userRepository.save(user);
  }

  // 전체조회
  async findAll() {
    const cached = await this.redisClient.get('users');
    if (cached) {
      return JSON.parse(cached);
    }

    const users = await this.userRepository.find();
    await this.redisClient.set('users', JSON.stringify(users), 'EX', 30);
    return users;
  }

  // 단일조회
  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    })
  }

  // 수정
  async update(id: number, name: string) {
    await this.redisClient.del('users'); // 캐시 초기화
    return this.userRepository.update(
      { id },
      { name },
    )
  }

  // 삭제
  async remove(id: number) {
    await this.redisClient.del('users'); // 캐시 초기화
    return this.userRepository.delete({ id });
  }
}
