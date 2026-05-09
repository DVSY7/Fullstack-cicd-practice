import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UserService', () => {
  let service: UserService;

  // 가짜 Repository 만들기
  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository, // 가짜 Repository 주입
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // 추가할 테스트 케이스들
  describe('create', () => {
    it('user를 생성하고 반환한다', async () => {
      const mockUser = { id: 1, name: 'test' }
      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.create('test');

      expect(mockUserRepository.create).toHaveBeenCalledWith({ name: 'test' });
      expect(result).toEqual(mockUser);
    })
  })

  describe('findAll', () => {
    it('전체 user 목록을 반환한다', async () => {
      const mockUsers = [
        { id: 1, name: 'test1' },
        { id: 2, name: 'test2' },
      ]
      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    })
  })

  describe('findOne', () => {
    it('id로 user를 조회한다', async () => {
      const mockUser = { id: 1, name: 'test' }
      mockUserRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOne(1)

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } })
      expect(result).toEqual(mockUser)
    })
  })

  describe('update', () => {
    it('user 이름을 수정한다', async () => {
      const mockResult = { affected: 1 }
      mockUserRepository.update.mockResolvedValue(mockResult)

      const result = await service.update(1, 'newName')

      expect(mockUserRepository.update).toHaveBeenCalledWith({ id: 1 }, { name: 'newName' })
      expect(result).toEqual(mockResult)
    })
  })

  describe('remove', () => {
    it('user를 삭제한다', async () => {
      const mockResult = { affected: 1 }
      mockUserRepository.delete.mockResolvedValue(mockResult)

      const result = await service.remove(1)

      expect(mockUserRepository.delete).toHaveBeenCalledWith({ id: 1 })
      expect(result).toEqual(mockResult)
    })
  })
});
