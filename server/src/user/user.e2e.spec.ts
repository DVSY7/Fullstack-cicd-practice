import { INestApplication } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import request from 'supertest';
import { AppModule } from "../app.module";

describe('User API(e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT) || 3306,
          username: process.env.DB_USERNAME || 'root',
          password: process.env.DB_PASSWORD || '1009',
          database: process.env.DB_DATABASE || 'mydb_test', // 테스트용 DB
          autoLoadEntities: true,
          synchronize: true,
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /user -> 유저 생성', () => {
    return request(app.getHttpServer())
      .post('/user')
      .send({ name: 'test' })
      .expect(201)
  })

  it('GET /user -> 유저 목록 조회', () => {
    return request(app.getHttpServer())
      .get('/user')
      .expect(200)
  })

  it('PATCH /user/:id -> 유저 수정', () => {
    return request(app.getHttpServer())
      .patch('/user/1')
      .send({ name: 'updated' })
      .expect(200)
  })

  it('DELETE /user/:id -> 유저 삭제', () => {
    return request(app.getHttpServer())
      .delete('/user/1')
      .expect(200)
  })
})