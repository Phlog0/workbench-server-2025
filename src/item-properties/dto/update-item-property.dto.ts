import { PartialType } from '@nestjs/mapped-types';
import { CreateItemPropertyDto } from './create-item-property.dto';

export class UpdateItemPropertyDto extends PartialType(CreateItemPropertyDto) {}
