import { utils, WorkBook } from "xlsx";

import { NotFoundException } from "@nestjs/common";
import { FilenameForTableSection10Kv } from "@/@types";
import { TableResult } from "../types";

export const section35KvTableResult = (
  fileName: FilenameForTableSection10Kv,
  wb: WorkBook,
  firstSheetName: string,
): TableResult => {
  switch (fileName) {
    case "model":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        header: [
          "model",
          "manufacturer",
          "material",
          "crossSection",
          "permissibleCurrent",
          "typeOfIsolation",
          "climaticVersion",
        ],
      });

    default:
      throw new NotFoundException("файл не найден!");
  }
};
