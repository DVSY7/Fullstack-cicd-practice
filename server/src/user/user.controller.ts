import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // 생성
  @Post()
  create(@Body('name') name: string) {
    return this.userService.create(name);
  }

  // 전체조회
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // 단일조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  // 업데이트
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('name') name: string,
  ) {
    return this.userService.update(Number(id), name);
  }


  // 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(Number(id));
  }
}

// CRUD

// create : 생성
// read : 조회
// update : 수정
// delete : 삭제

// DI : 의존성 주입
