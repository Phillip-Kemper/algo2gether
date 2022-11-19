import algosdk from "algosdk";
import type { NextPage } from "next";
import MyAlgo from "@randlabs/myalgo-connect";
import Head from "next/head";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";

const Home: NextPage = () => {
  const algodToken = "";
  const algodServer = "https://node.testnet.algoexplorerapi.io";
  const algodPort = "443";
  const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
  const address = localStorage.getItem("address");

  const indexer_token = "";
  const INDEXER_SERVER = "https://algoindexer.algoexplorerapi.io/";
  const INDEXER_PORT = 443;

  const indexerClient = new algosdk.Indexer(
    indexer_token,
    INDEXER_SERVER,
    INDEXER_PORT
  );

  const myAlgoWallet = new MyAlgo();

  const optInToAsset = async () => {
    try {
      let txn = await algodClient.getTransactionParams().do();

      const ASSET_ID = 312769;
      txn = {
        ...txn,
        fee: 1000,
        flatFee: true,
        type: "axfer",
        assetIndex: ASSET_ID,
        from: address,
        to: address,
        amount: 0,
        note: new Uint8Array(Buffer.from("Hello World")),
      };

      console.log(txn);

      let signedTxn = await myAlgoWallet.signTransaction(txn);

      console.log(signedTxn.txID);

      await algodClient.sendRawTransaction(signedTxn.blob).do();
    } catch (error) {
      console.log(error);
    }
  };

  const optedIn = async () => {
    const res = await indexerClient.lookupAccountAssets(address).do();
    console.log(JSON.stringify(res, undefined, 2));
  };

  return (
    <>
      <Typography className="m-5 absolute top-0 right-3">{address}</Typography>
      <Typography variant="h2">Welcome to TBC</Typography>
      <Typography variant="h4"> Your current status:</Typography>
      <Typography variant="h4"> No Membership Requested</Typography>

      <button
        className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={optInToAsset}
      >
        Opt In Now!
      </button>

      <Typography variant="h4">
        Waiting for a board members approval...
      </Typography>
      <Typography variant="h4">You are an active member.</Typography>
    </>
  );
};

export default Home;
