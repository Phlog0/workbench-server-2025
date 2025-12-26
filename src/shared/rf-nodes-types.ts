export const RF_NODE_TYPES = {
  section04Kv: "Section04Kv",
  section10Kv: "Section10Kv",
  section35Kv: "Section35Kv",

  fixatorContainer: "FixatorContainer",

  fixator04Kv: "Fixator04Kv",
  fixator10Kv: "Fixator10Kv",
  fixator35Kv: "Fixator35Kv",

  cell04Kv: "Cell04Kv",
  cell10Kv: "Cell10Kv",
  cell35Kv: "Cell35Kv",

  powerTransformer1004Kv: "PowerTransformer1004Kv",
  powerTransformer3510Kv: "PowerTransformer3510Kv",

  image: "Image",
} as const;

export type RfNodeType = typeof RF_NODE_TYPES;
export type RFNodeTypesValues = RfNodeType[keyof RfNodeType];
