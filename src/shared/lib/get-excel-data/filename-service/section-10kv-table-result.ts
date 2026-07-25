import { utils, WorkBook } from "xlsx";

import { NotFoundException } from "@nestjs/common";
import { TableResult } from "../types";
import { PossibleFilenameTable } from "@/@types";

export const section10KvTableResult = (
    fileName: PossibleFilenameTable,
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
