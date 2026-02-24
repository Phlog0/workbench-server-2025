import { utils, WorkBook } from "xlsx";

import { NotFoundException } from "@nestjs/common";
import { TableResult } from "../types";
import { FilenameForTablePt1004Kv } from "@/@types";

export const pt1004KvTableResult = (
  fileName: FilenameForTablePt1004Kv,
  wb: WorkBook,
  firstSheetName: string,
): TableResult => {
  switch (fileName) {
    case "parameters":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        // FIXME В noLoadCurrent числа через запятую, а в JS надо через точку.
        header: [
          "model",
          "type",
          "power",
          "voltage",
          "losses",
          "noLoadCurrent",
          "shortCircuitVoltage",
          "connectionType",
        ],
      });

    default:
      throw new NotFoundException("файл не найден!");
  }
};
