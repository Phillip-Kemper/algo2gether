import algosdk from "algosdk";

const config = {
  algodToken: "",
  algodServer: "https://node.testnet.algoexplorerapi.io",
  algodPort: "",
  indexerToken: "",
  indexerServer: "https://algoindexer.testnet.algoexplorerapi.io",
  indexerPort: "",
};

export const algodToken = "";
export const algodServer = "https://node.testnet.algoexplorerapi.io";
export const algodPort = "443";
export const algodClient = new algosdk.Algodv2(
  algodToken,
  algodServer,
  algodPort
);

const indexer_token = "";
const INDEXER_SERVER = "http://131.159.14.109";
const INDEXER_PORT = 8980;

export const indexerClient = new algosdk.Indexer(
  indexer_token,
  INDEXER_SERVER,
  INDEXER_PORT
);

export const base64ToUTF8String = (base64String) => {
  return Buffer.from(base64String, "base64").toString("utf-8");
};

export const utf8ToBase64String = (utf8String) => {
  return Buffer.from(utf8String, "utf8").toString("base64");
};

export const ASSET_ID = 123986252;
