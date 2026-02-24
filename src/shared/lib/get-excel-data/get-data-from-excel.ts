import { NotFoundException } from "@nestjs/common";
import { readFile, utils, WorkBook } from "xlsx";

import { getFilePath } from "./get-file-path";
import { RFNodeTypesValues } from "../../rf-nodes-types";

import { ListResult, TableResult } from "./types";

import { PossibleFilenameTable } from "@/@types";

import { tableHandlers, typeCheckers } from "./filename-service";

export const getListData = (folderType: RFNodeTypesValues, fileName: string): ListResult => {
  try {
    const data: null | WorkBook = readFile(getFilePath(folderType, fileName));
    if (data !== null) {
      const firstSheetName = data.SheetNames[0];
      const mappedData = utils
        .sheet_to_json(data.Sheets[firstSheetName], { header: 1 })
        .flatMap((item) => item) as ListResult;

      return mappedData;
    } else {
      throw new NotFoundException("нет такого файла");
    }
  } catch (error) {
    throw new NotFoundException(error);
  }
};

export const getTableData = (
  folderType: RFNodeTypesValues,
  fileName: PossibleFilenameTable,
): TableResult => {
  try {
    const wb = readFile(getFilePath(folderType, fileName));
    const firstSheetName = wb.SheetNames[0];
    for (const [type, checker] of Object.entries(typeCheckers)) {
      if (checker(fileName, folderType)) {
        return tableHandlers[type as keyof typeof tableHandlers](fileName, wb, firstSheetName);
      }
    }
  } catch (error) {
    throw new NotFoundException({ message: "Не удалось получить доступ к файлу", error });
  }
};
