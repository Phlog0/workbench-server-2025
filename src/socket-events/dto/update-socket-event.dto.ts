import { PartialType } from '@nestjs/mapped-types';
import { CreateSocketEventDto } from './create-socket-event.dto';

export class UpdateSocketEventDto extends PartialType(CreateSocketEventDto) {
  id: number;
}
