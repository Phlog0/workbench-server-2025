import { Injectable } from "@nestjs/common";
import { CreateSavePdfDto } from "./dto/create-save-pdf.dto";
import { UpdateSavePdfDto } from "./dto/update-save-pdf.dto";
import multer from "multer";
import { join } from "path/posix";

@Injectable()
export class SavePdfService {
  async create(createSavePdfDto: CreateSavePdfDto) {
    //   const generatePDF = async (htmlContent: string) => {
    //     const browser = await puppeteer.launch();
    //     const page = await browser.newPage();
    //     await page.setContent(htmlContent);

    //     await page.addStyleTag({
    //       content: `
    //         body { margin: 0; }
    //         svg { width: 100%; height: auto; }
    //       `,
    //     });

    //     const pdfBuffer = await page.pdf({
    //       format: "A4",
    //       printBackground: true,
    //       preferCSSPageSize: true,
    //     });

    //     await browser.close();
    //     return pdfBuffer;
    //   };
    //   const uint8ArrayPdf = await generatePDF(createSavePdfDto.htmlContent);

    //   upload(uint8ArrayPdf);
    return "This action adds a new savePdf";
  }
}
