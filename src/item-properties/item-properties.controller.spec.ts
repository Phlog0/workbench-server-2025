import { Test, TestingModule } from '@nestjs/testing';
import { ItemPropertiesController } from './item-properties.controller';
import { ItemPropertiesService } from './item-properties.service';

describe('ItemPropertiesController', () => {
  let controller: ItemPropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPropertiesController],
      providers: [ItemPropertiesService],
    }).compile();

    controller = module.get<ItemPropertiesController>(ItemPropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
