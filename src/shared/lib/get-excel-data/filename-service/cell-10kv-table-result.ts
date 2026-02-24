import { utils, WorkBook } from "xlsx";
import { defaultSheetCellValue } from "../default-excel-values";
import { NotFoundException } from "@nestjs/common";
import { TableResult } from "../types";
import { FilenameForTableCell10Kv } from "@/@types";

export const cell10KvTableResult = (
  fileName: FilenameForTableCell10Kv,
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

    case "measuringCurrentTransformersDevice":
      return utils.sheet_to_json(wb.Sheets["Лист1"], {
        defval: defaultSheetCellValue,
        header: [
          "type",
          "title",
          "manufacturer",
          "transformationRatio",
          "accuracyClass",
          "oneSecondThermalCurrent",
          "typeOfService",
        ],
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
    case "opn":
      return utils.sheet_to_json(wb.Sheets[firstSheetName], {
        defval: defaultSheetCellValue,
        header: [
          "type",
          "title",
          "manufacturer",
          "ratedOperatingVoltage",
          "throughput",
          "ratedDischargeCurrent",
          "maximumContinuousPermissibleOperatingVoltage",
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
