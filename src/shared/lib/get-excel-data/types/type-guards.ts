import {
  FilenameForTableCell04Kv,
  FilenameForTableCell10Kv,
  FilenameForTableCell35Kv,
  FilenameForTablePt1004Kv,
  FilenameForTableSection04Kv,
  FilenameForTableSection10Kv,
  FilenameForTableSection35Kv,
  PossibleFilename,
  PossibleFilenameList,
  PossibleFilenameTable,
} from "@/@types";
import { RF_NODE_TYPES, RFNodeTypesValues } from "../../../rf-nodes-types";

export function isCell35KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableCell35Kv {
  return folderType === RF_NODE_TYPES.cell35Kv;
}
export function isCell10KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableCell10Kv {
  return folderType === RF_NODE_TYPES.cell10Kv;
}

export function isCell04KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableCell04Kv {
  return folderType === RF_NODE_TYPES.cell04Kv;
}

export function isSection35KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableSection35Kv {
  return folderType === RF_NODE_TYPES.section35Kv;
}

export function isSection10KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableSection10Kv {
  return folderType === RF_NODE_TYPES.section10Kv;
}
export function isSection04KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTableSection04Kv {
  return folderType === RF_NODE_TYPES.section04Kv;
}

export function isPt1004KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTablePt1004Kv {
  return folderType === RF_NODE_TYPES.powerTransformer1004Kv;
}
export function isPt3510KvFileName(
  fileName: PossibleFilenameTable,
  folderType: RFNodeTypesValues,
): fileName is FilenameForTablePt1004Kv {
  return folderType === RF_NODE_TYPES.powerTransformer3510Kv;
}
export function isFileNameList(fileName: PossibleFilename): fileName is PossibleFilenameList {
  return fileName === "typeOfCell" || fileName === "typeOfSwitchingDevice";
}
export function isFileNameTable(fileName: PossibleFilename): fileName is PossibleFilenameTable {
  return !(fileName === "typeOfCell" || fileName === "typeOfSwitchingDevice");
}
