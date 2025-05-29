export type FileNameFor1Column10Kv = "typeOfCell" | "typeOfSwitchingDevice";
export type FileNameForMultipleColumns10Kv =
  | "switchingDeviceVv"
  | "switchingDeviceVn"
  | "switchingDeviceR"
  | "measuringCurrentTransformersDevice"
  | "tn"
  | "microproc"
  | "opn"
  | "tsn";

export type FileNameFor1Column04Kv = "typeOfCell";
export type DictionaryFolders = "cell-10kv" | "cell-04kv" | "cell-35kv" | "transformer-10-04kv";
