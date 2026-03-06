import { Module } from '@nestjs/common';
import { SocketEventsService } from './socket-events.service';
import { SocketEventsGateway } from './socket-events.gateway';

@Module({
  providers: [SocketEventsGateway, SocketEventsService],
})
export class SocketEventsModule {}
