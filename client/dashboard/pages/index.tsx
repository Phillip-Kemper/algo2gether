import algosdk from "algosdk";
import type { NextPage } from "next";
import MyAlgo from "@randlabs/myalgo-connect";
import Head from "next/head";
import Image from "next/image";

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
      // let sender = address;
      // let recipient = sender;
      // let revocationTarget = undefined;
      // let closeRemainderTo = undefined;
      // let amount = 0;

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
      // let opttxn = algosdk.makeAssetTransferTxnWithSuggestedParams(
      //   sender,
      //   recipient,
      //   closeRemainderTo,
      //   revocationTarget,
      //   amount,
      //   new Uint8Array(Buffer.from("Hello World")),
      //   ASSET_ID,
      //   params
      // );
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
      <button onClick={optInToAsset}>Opt In</button>
      <button onClick={optedIn}>Opted in???</button>
    </>
  );
};

export default Home;
