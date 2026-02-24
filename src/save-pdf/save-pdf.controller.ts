import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { SavePdfService } from "./save-pdf.service";
import { CreateSavePdfDto } from "./dto/create-save-pdf.dto";
import { UpdateSavePdfDto } from "./dto/update-save-pdf.dto";
import { Request } from "express";
import { SkipAuth } from "@/auth/decorators/skip-auth.decorator";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";

@Controller("save-pdf")
export class SavePdfController {
  constructor(private readonly savePdfService: SavePdfService) {}
  @SkipAuth()
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, join(process.cwd(), "dictionaries", "documentsPDF"));
        },
        filename(req, file, callback) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  create(@UploadedFile() file: Express.Multer.File) {
    console.log("Received data:", file);
    return "hi";
    // return this.savePdfService.creat e(createSavePdfDto);
  }
}
