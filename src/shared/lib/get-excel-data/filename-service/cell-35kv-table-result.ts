import { utils, WorkBook } from "xlsx";
import { defaultSheetCellValue } from "../default-excel-values";
import { NotFoundException } from "@nestjs/common";
import { TableResult } from "../types";
import { FilenameForTableCell35Kv } from "src/@types";

export const cell35KvTableResult = (
  fileName: FilenameForTableCell35Kv,
  wb: WorkBook,
  firstSheetName: string,
): TableResult => {
  switch (fileName) {
    case "switchingDeviceVv":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        header: [
          "type",
          "title",
          "manufacturer",
          "ratedCurrent",
          "ratedBreakingCurrent",
          "ratedVoltage",
        ],
      });

    case "switchingDeviceVn":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "type",
          "title",
          "manufacturer",
          "ratedCurrent",
          "ratedBreakingCurrent",
          "ratedVoltage",
          "numberOfGroundShafts",
          "locationOfGroundingBlades",
          "switchDriveLocation",
          "locationOfTheGroundingBladeDrive",
        ],
      });

    case "switchingDeviceR":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer", "ratedCurrent", "thermalCurrent", "ratedVoltage"],
      });

    case "tn":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "type",
          "title",
          "manufacturer",
          "ratedThreePhasePowerOfTheFirstWinding",
          "accuracyClassOfTheFirstSecondaryWinding",
          "ratedThreePhasePowerOfTheSecondSecondaryWinding",
          "accuracyClassOfTheSecondSecondaryWinding",
          "ratedThreePhasePowerOfAadditionalSecondaryWinding",
          "accuracyClassOfSecondaryReturnWires",
          "ratedLineVoltageAtTheTerminalsOfThePrimaryWinding",
        ],
      });

    case "tsn":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer", "ratedPower"],
      });
    case "mpdaa":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer"],
      });

    default:
      throw new NotFoundException("файл не найден!");
  }
};
