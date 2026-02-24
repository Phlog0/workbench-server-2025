import { Controller, Get, Param, Query } from "@nestjs/common";
import { GetDictionaryDataService } from "./get-dictionary-data.service";

import { QueryParametersGetDictionary } from "./dto/query-parameters-get-dictionary";
import { RFNodeTypesValues } from "@/shared/rf-nodes-types";
import { PossibleFilename } from "@/@types";
import { SkipAuth } from "@/auth/decorators/skip-auth.decorator";
// @SkipAuth()
@Controller("getReadySolutionsList")
// @Controller("api/get-dictionary-data")
export class GetDictionaryDataController {
  constructor(private readonly getDictionaryDataService: GetDictionaryDataService) {}

  @SkipAuth()
  @Get(":typeFolder/:fileName")
  getDictionaryData(
    @Param("typeFolder") typeFolder: RFNodeTypesValues,
    @Param("fileName") fileName: PossibleFilename,
    @Query() queryParams: QueryParametersGetDictionary,
  ) {
    const dictionaryData = this.getDictionaryDataService.getDictionaryData(
      typeFolder,
      fileName,
      queryParams,
    );
    return { dictionaryData };
  }
}
