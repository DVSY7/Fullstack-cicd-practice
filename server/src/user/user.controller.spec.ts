import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  // 가짜 UserService 만들기
  const mockUserService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,  // 가짜 UserService 주입
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('user를 생성하고 반환한다', async () => {
      const mockUser = { id: 1, name: 'test' };
      mockUserService.create.mockResolvedValue(mockUser);

      const result = await controller.create('test');

      expect(mockUserService.create).toHaveBeenCalledWith('test');
      expect(result).toEqual(mockUser);
    });
  })

  describe('findAll', () => {
    it('전체 user 목록을 반환한다', async () => {
      const mockUsers = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]
      mockUserService.findAll.mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    })
  })

  describe('findOne', () => {
    it('id로 user를 조회한다', async () => {
      const mockUser = { id: 1, name: 'test' }
      mockUserService.findOne.mockResolvedValue(mockUser)

      const result = await controller.findOne('1')

      expect(mockUserService.findOne).toHaveBeenCalledWith(1)
      expect(result).toEqual(mockUser)
    })
  })

  describe('update', () => {
    it('user 이름을 수정한다', async () => {
      const mockResult = { affected: 1 }
      mockUserService.update.mockResolvedValue(mockResult)

      const result = await controller.update('1', 'newName')

      expect(mockUserService.update).toHaveBeenCalledWith(1, 'newName')
      expect(result).toEqual(mockResult)
    })
  })

  describe('remove', () => {
    it('user를 삭제한다', async () => {
      const mockResult = { affected: 1 }
      mockUserService.remove.mockResolvedValue(mockResult)

      const result = await controller.remove('1')

      expect(mockUserService.remove).toHaveBeenCalledWith(1)
      expect(result).toEqual(mockResult)
    })
  })
});
