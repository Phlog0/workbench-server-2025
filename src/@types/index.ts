export type { FilenameForListCell04Kv, FilenameForTableCell04Kv } from "./cell-04kv";
export type { FilenameForListCell10Kv, FilenameForTableCell10Kv } from "./cell-10kv";
export type { FilenameForTablePt1004Kv } from "./pt-1004kv";
export type { FilenameForTableSection04Kv } from "./section-04kv";
export type { FilenameForTableSection10Kv } from "./section-10kv";
export type { FilenameForTableSection35Kv } from "./section-35kv";
export type { FilenameForTableCell35Kv } from "./cell-35kv";

import type { FilenameForTableCell35Kv } from "./cell-35kv";
import type { FilenameForListCell04Kv, FilenameForTableCell04Kv } from "./cell-04kv";
import type { FilenameForListCell10Kv, FilenameForTableCell10Kv } from "./cell-10kv";
import type { FilenameForTablePt1004Kv } from "./pt-1004kv";
import type { FilenameForTableSection04Kv } from "./section-04kv";
import type { FilenameForTableSection10Kv } from "./section-10kv";
import type { FilenameForTableSection35Kv } from "./section-35kv";

export type PossibleFilenameList = FilenameForListCell04Kv | FilenameForListCell10Kv;
export type PossibleFilenameTable =
  | FilenameForTableCell04Kv
  | FilenameForTableCell10Kv
  | FilenameForTableCell35Kv
  | FilenameForTablePt1004Kv
  | FilenameForTableSection04Kv
  | FilenameForTableSection10Kv
  | FilenameForTableSection35Kv;
export type PossibleFilename = PossibleFilenameList | PossibleFilenameTable;
