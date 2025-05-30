import { join } from "path";
import { DictionaryFolders } from "src/shared/types";

export const getFilePath = (folderType: DictionaryFolders, fileName: string) => {
  const filePath = join(process.cwd(), "/dictionares/", `${folderType}`, `/${fileName}.xlsx`);
  return filePath;
};
