import { Test, TestingModule } from '@nestjs/testing';
import { GetDictionaryDataController } from './get-dictionary-data.controller';
import { GetDictionaryDataService } from './get-dictionary-data.service';

describe('GetDictionaryDataController', () => {
  let controller: GetDictionaryDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetDictionaryDataController],
      providers: [GetDictionaryDataService],
    }).compile();

    controller = module.get<GetDictionaryDataController>(GetDictionaryDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
