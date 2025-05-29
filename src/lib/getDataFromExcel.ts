import { NotFoundException } from "@nestjs/common";
import { readFile, utils, WorkBook } from "xlsx";
import { DictionaryFolders, FileNameForMultipleColumns10Kv } from "src/shared/types";
import { getFilePath } from "./get-file-path";
const defaultSheetCellValue = "-";
const defaultSheetKey = "Лист1";
type GetRowDataResult = (number | string)[];
export const getRowData = (folderType: DictionaryFolders, fileName: string): GetRowDataResult => {
  const data: null | WorkBook = readFile(getFilePath(folderType, fileName));
  if (data !== null) {
    const mappedData = utils
      .sheet_to_json(data.Sheets[defaultSheetKey], { header: 1 })
      .flatMap((item) => item) as GetRowDataResult;

    return mappedData;
  } else {
    throw new NotFoundException("нет такого файла");
  }
};

type GetTableDataResult = Record<string, string | number>;
export const getTableData = (
  folderType: DictionaryFolders,
  fileName: FileNameForMultipleColumns10Kv,
): GetTableDataResult[] => {
  const wb = readFile(getFilePath(folderType, fileName));
  switch (fileName) {
    case "switchingDeviceVv":
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
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
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
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
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer", "ratedCurrent", "thermalCurrent", "ratedVoltage"],
      });
    case "measuringCurrentTransformersDevice":
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
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
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
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
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
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
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer", "ratedPower"],
      });
    case "microproc":
      return utils.sheet_to_json(wb.Sheets[defaultSheetKey], {
        defval: defaultSheetCellValue,
        header: ["type", "title", "manufacturer"],
      });

    default:
      throw new NotFoundException("файл не найден");
    // throw new Error({ status: 404, message: `Неопознанный запрос: <--- ${fileName} --->` })
  }
};
