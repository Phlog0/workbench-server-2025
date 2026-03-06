import { Test, TestingModule } from '@nestjs/testing';
import { SocketEventsService } from './socket-events.service';

describe('SocketEventsService', () => {
  let service: SocketEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketEventsService],
    }).compile();

    service = module.get<SocketEventsService>(SocketEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
