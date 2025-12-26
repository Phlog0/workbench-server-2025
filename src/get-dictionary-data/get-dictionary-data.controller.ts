import { Controller, Get, Param, HttpException, HttpStatus, Query } from "@nestjs/common";
import { GetDictionaryDataService } from "./get-dictionary-data.service";

import { QueryParametersGetDictionary } from "./dto/query-parameters-get-dictionary";
import { SkipAuth } from "src/auth/decorators/skip-auth.decorator";
import { RFNodeTypesValues } from "src/shared/rf-nodes-types";
import { PossibleFilename } from "src/@types";
@SkipAuth()
@Controller("api")
// @Controller("api/get-dictionary-data")
export class GetDictionaryDataController {
  constructor(private readonly getDictionaryDataService: GetDictionaryDataService) {}

  @Get(":typeFolder/:fileName")
  getDictionaryData(
    @Param("typeFolder") typeFolder: RFNodeTypesValues,
    @Param("fileName") fileName: PossibleFilename,
    @Query() queryParams: QueryParametersGetDictionary,
  ) {
    try {
      const dictionaryData = this.getDictionaryDataService.getDictionaryData(
        typeFolder,
        fileName,
        queryParams,
      );
      return { data: dictionaryData };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Invalid request",
          details: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
