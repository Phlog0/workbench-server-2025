import { Test, TestingModule } from '@nestjs/testing';
import { GetDictionaryDataService } from './get-dictionary-data.service';

describe('GetDictionaryDataService', () => {
  let service: GetDictionaryDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetDictionaryDataService],
    }).compile();

    service = module.get<GetDictionaryDataService>(GetDictionaryDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
