import { Test, TestingModule } from '@nestjs/testing';
import { ItemPropertiesService } from './item-properties.service';

describe('ItemPropertiesService', () => {
  let service: ItemPropertiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPropertiesService],
    }).compile();

    service = module.get<ItemPropertiesService>(ItemPropertiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
