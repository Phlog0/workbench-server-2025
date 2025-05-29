import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { GetDictionaryDataService } from "./get-dictionary-data.service";
import { CreateGetDictionaryDatumDto } from "./dto/create-get-dictionary-datum.dto";
import { UpdateGetDictionaryDatumDto } from "./dto/update-get-dictionary-datum.dto";
import {
  DictionaryFolders,
  FileNameFor1Column10Kv,
  FileNameForMultipleColumns10Kv,
} from "src/shared/types";
import { QueryParametersGetDictionary } from "./dto/query-parameters-get-dictionary";

@Controller("api")
// @Controller("api/get-dictionary-data")
export class GetDictionaryDataController {
  constructor(private readonly getDictionaryDataService: GetDictionaryDataService) {}

  @Get(":typeFolder/:fileName")
  getDictionaryData(
    @Param("typeFolder") typeFolder: DictionaryFolders,
    @Param("fileName") fileName: FileNameFor1Column10Kv | FileNameForMultipleColumns10Kv,
    @Query() queryParams: QueryParametersGetDictionary,
  ) {
    try {
      const res = this.getDictionaryDataService.getDictionaryData(
        typeFolder,
        fileName,
        queryParams,
      );
      return res;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "Файл не найден",
        },
        HttpStatus.NOT_FOUND,
        {
          cause: error,
        },
      );
    }
  }
  //   @Get(":fileName/:count")
  //   getDataWithParams(
  //     @Param("fileName") id: FileNameFor1Column10Kv | FileNameForMultipleColumns10Kv,
  //     @Param("count", ParseIntPipe) count: number,
  //   ) {
  //     try {
  //       return this.getDictionaryDataService.getDictionaryData(id, count);
  //     } catch (error) {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.NOT_FOUND,
  //           error: "Файл не найден",
  //         },
  //         HttpStatus.NOT_FOUND,
  //         {
  //           cause: error,
  //         },
  //       );
  //     }
  //   }
}
