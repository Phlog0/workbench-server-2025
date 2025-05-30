import { Injectable } from "@nestjs/common";
import { CreateGetDictionaryDatumDto } from "./dto/create-get-dictionary-datum.dto";
import { UpdateGetDictionaryDatumDto } from "./dto/update-get-dictionary-datum.dto";
import { getRowData, getTableData } from "src/shared/lib/getDataFromExcel";
import {
  DictionaryFolders,
  FileNameFor1Column04Kv,
  FileNameFor1Column10Kv,
  FileNameForMultipleColumns10Kv,
} from "src/shared/types";
import { QueryParametersGetDictionary } from "./dto/query-parameters-get-dictionary";

@Injectable()
export class GetDictionaryDataService {
  getDictionaryData(
    typeFolder: DictionaryFolders,
    fileName: FileNameForMultipleColumns10Kv | FileNameFor1Column10Kv | FileNameFor1Column04Kv,
    queryParams: QueryParametersGetDictionary,
  ) {
    if (
      fileName === "typeOfCell" ||
      fileName === "typeOfSwitchingDevice"

      // ? || ["typeOfCell", "typeOfSwitchingDevice"].includes(fileName)
    ) {
      const res = getRowData(typeFolder, fileName);

      //TODO
      return res;
    } else {
      const res = getTableData(typeFolder, fileName);
      if (res !== null) {
        const tableHeaders = res.shift();
        if (
          queryParams &&
          "measuringCurrentTransformersDeviceAccuracyClass" in queryParams &&
          fileName === "measuringCurrentTransformersDevice"
        ) {
          const { measuringCurrentTransformersDeviceAccuracyClass } = queryParams;

          const regexPattern = new RegExp(
            new Array(measuringCurrentTransformersDeviceAccuracyClass).fill(".+").join("\\/"),
          );
          //*
          //* 1:/.+/
          //* 4:/.+\/.+\/.+\/.+/
          const filtered = res.filter((item) =>
            (item["accuracyClass"] as string).match(regexPattern),
          );

          return { tableHeaders, body: filtered };
        }

        return { tableHeaders, body: res };
      }
    }
  }
}
