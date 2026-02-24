import { Injectable } from "@nestjs/common";

import { QueryParametersGetDictionary } from "./dto/query-parameters-get-dictionary";
import { RFNodeTypesValues } from "@/shared/rf-nodes-types";
import { PossibleFilename } from "@/@types";
import { isFileNameList } from "@/shared/lib/get-excel-data/types/type-guards";
import { getListData, getTableData } from "@/shared/lib/get-excel-data/get-data-from-excel";

@Injectable()
export class GetDictionaryDataService {
  getDictionaryData(
    typeFolder: RFNodeTypesValues,
    fileName: PossibleFilename,
    queryParams: QueryParametersGetDictionary,
  ) {
    if (isFileNameList(fileName)) {
      return getListData(typeFolder, fileName);
    } else {
      const res = getTableData(typeFolder, fileName);
      if (res !== null) {
        const tableColumns = res.shift();
        if (
          (queryParams || "measuringCurrentTransformersDeviceAccuracyClass" in queryParams) &&
          fileName === "measuringCurrentTransformersDevice"
        ) {
          const { measuringCurrentTransformersDeviceAccuracyClass } = queryParams;

          const regexPattern = new RegExp(
            new Array(+measuringCurrentTransformersDeviceAccuracyClass || 0).fill(".+").join("\\/"),
          );
          //*
          //* 1:/.+/
          //* 4:/.+\/.+\/.+\/.+/
          const filteredTableBody = res.filter((item) =>
            (item["accuracyClass"] as string).match(regexPattern),
          );

          return { tableColumns: tableColumns, tableBody: filteredTableBody };
        }

        return { tableColumns: tableColumns, tableBody: res };
      }
    }
  }
}
