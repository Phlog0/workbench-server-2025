import { join } from "path";
import { RFNodeTypesValues } from "../../rf-nodes-types";

export const getFilePath = (
    folderType: RFNodeTypesValues,
    fileName: string,
) => {
    const filePath = join(
        process.cwd(),
        "dictionaries",
        `${folderType}`,
        "/",
        `${fileName}.xlsx`,
    );
    return filePath;
};
