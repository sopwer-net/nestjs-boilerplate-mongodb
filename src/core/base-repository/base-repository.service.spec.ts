import { Test, TestingModule } from '@nestjs/testing';
import { BaseRepository } from './base-repository.service';

describe('BaseRepositoryService', () => {
  let service: BaseRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseRepository],
    }).compile();

    service = module.get<BaseRepository>(BaseRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
