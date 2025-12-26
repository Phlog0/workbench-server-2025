import { utils, WorkBook } from "xlsx";
import { defaultSheetCellValue } from "../default-excel-values";
import { NotFoundException } from "@nestjs/common";
import { FilenameForTableCell04Kv } from "src/@types";
import { TableResult } from "../types";

export const cell04KvTableResult = (
  fileName: FilenameForTableCell04Kv,
  wb: WorkBook,
  firstSheetName: string,
): TableResult => {
  switch (fileName) {
    case "ammeter":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "title",
          "manufacturer",
          "type",
          "measuringRange",
          "accuracyClass",
          "ingressProtection",
          "overloadProtection",
          "measures",
          "mounting",
          "interface",
          "notes",
        ],
      });
    case "measuringCurrentTransformersDevice":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "title",
          "manufacturer",
          "type",
          "ratedCurrent",
          "accuracyClass",
          "transformationRatio",
          "power",
          "ingressProtection",
          "mounting",
          "applications",
        ],
      });
    case "fuse":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "title",
          "manufacturer",
          "type",
          "ratedCurrent",
          "accuracyClass",
          "transformationRatio",
          "power",
          "ingressProtection",
          "mounting",
          "applications",
        ],
      });
    case "switch":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: ["manufacturer", "title", "type", "ratedCurrent", "additionalFunctions"],
      });

    default:
      throw new NotFoundException("файл не найден");
  }
};
