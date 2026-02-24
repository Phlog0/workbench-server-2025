import { PossibleFilenameTable } from "@/@types";
import { WorkBook } from "xlsx";
import { TableResult } from "../types";
import { RFNodeTypesValues } from "@/shared/rf-nodes-types";
import { cell04KvTableResult } from "./cell-04kv-table-result";
import { section04KvTableResult } from "./section-04kv-table-result";
import { pt1004KvTableResult } from "./pt-1004kv-table-result";
import { cell10KvTableResult } from "./cell-10kv-table-result";
import { cell35KvTableResult } from "./cell-35kv-table-result";
import { section10KvTableResult } from "./section-10kv-table-result";
import { section35KvTableResult } from "./section-35kv-table-result";
import {
  isCell04KvFileName,
  isCell10KvFileName,
  isCell35KvFileName,
  isPt1004KvFileName,
  isPt3510KvFileName,
  isSection04KvFileName,
  isSection10KvFileName,
  isSection35KvFileName,
} from "../types/type-guards";
import { pt3510KvTableResult } from "./pt-3510kv-table-result";

type TableHandler = (
  filename: PossibleFilenameTable,
  wb: WorkBook,
  sheetName: string,
) => TableResult;

export const tableHandlers: Partial<Record<RFNodeTypesValues, TableHandler>> = {
  Cell04Kv: cell10KvTableResult,
  Cell10Kv: cell10KvTableResult,
  Cell35Kv: cell10KvTableResult,
  Section04Kv: section04KvTableResult,
  Section10Kv: section10KvTableResult,
  Section35Kv: section35KvTableResult,
  PowerTransformer1004Kv: pt1004KvTableResult,
  PowerTransformer3510Kv: pt3510KvTableResult,
} as const;

type typeChecker = (filename: PossibleFilenameTable, folderType: RFNodeTypesValues) => boolean;

export const typeCheckers: Partial<Record<RFNodeTypesValues, typeChecker>> = {
  Cell04Kv: isCell04KvFileName,
  Cell10Kv: isCell10KvFileName,
  Cell35Kv: isCell35KvFileName,
  Section04Kv: isSection04KvFileName,
  Section10Kv: isSection10KvFileName,
  Section35Kv: isSection35KvFileName,
  PowerTransformer1004Kv: isPt1004KvFileName,
  PowerTransformer3510Kv: isPt3510KvFileName,
} as const;
