import { PartialType } from '@nestjs/mapped-types';
import { CreateSavePdfDto } from './create-save-pdf.dto';

export class UpdateSavePdfDto extends PartialType(CreateSavePdfDto) {}
