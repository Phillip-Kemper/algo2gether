import algosdk from "algosdk";

const config = {
  algodToken: "",
  algodServer: "https://node.testnet.algoexplorerapi.io",
  algodPort: "",
  indexerToken: "",
  indexerServer: "https://algoindexer.testnet.algoexplorerapi.io",
  indexerPort: "",
};

export const algodClient = new algosdk.Algodv2(
  config.algodToken,
  config.algodServer,
  config.algodPort
);

export const indexerClient = new algosdk.Indexer(
  config.indexerToken,
  config.indexerServer,
  config.indexerPort
);

export const base64ToUTF8String = (base64String) => {
  return Buffer.from(base64String, "base64").toString("utf-8");
};

export const utf8ToBase64String = (utf8String) => {
  return Buffer.from(utf8String, "utf8").toString("base64");
};

export const ASSET_ID = 312769;
