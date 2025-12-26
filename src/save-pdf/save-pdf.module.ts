import { Module } from '@nestjs/common';
import { SavePdfService } from './save-pdf.service';
import { SavePdfController } from './save-pdf.controller';

@Module({
  controllers: [SavePdfController],
  providers: [SavePdfService],
})
export class SavePdfModule {}
