import { Typography } from "@mui/material";
import MyAlgo from "@randlabs/myalgo-connect";
import type { NextPage } from "next";
import React, { useEffect } from "react";
import { algodClient, ASSET_ID, indexerClient } from "../src/utils/constants";

export const getOptedIn = async (address: string) => {
  const assetInfo = await indexerClient.lookupAssetBalances(ASSET_ID).do();
  return assetInfo.balances.some((balance) => {
    return balance.amount == 0 && balance.address == address;
  });
};

export const getAssetBalanceForAddress = async (address: string) => {
  const assetInfo = await indexerClient
    .lookupAssetBalances(ASSET_ID)
    .currencyGreaterThan(0)
    .do();

  return assetInfo.balances.some((balance) => {
    return balance.amount > 0 && balance.address == address;
  });
};

const Home: NextPage = () => {
  const [hasBalance, setHasBalance] = React.useState(false);
  const [isOptedIn, setIsOptedIn] = React.useState(false);

  const address = localStorage.getItem("address");

  const myAlgoWallet = new MyAlgo();

  const optInToAsset = async () => {
    try {
      let txn = await algodClient.getTransactionParams().do();

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

      const signedTxn = await myAlgoWallet.signTransaction(txn);

      await algodClient.sendRawTransaction(signedTxn.blob).do();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const sB = async () => {
      const balance = await getAssetBalanceForAddress(address);
      setHasBalance(balance);
    };

    const sO = async () => {
      const opted = await getOptedIn(address);
      setIsOptedIn(opted);
    };
    sB();
    sO();
  }, [hasBalance, isOptedIn]);

  React.useMemo(() => {
    console.log(hasBalance);
    console.log(isOptedIn);
  }, [hasBalance, isOptedIn]);

  return (
    <>
      <Typography className="m-5 absolute top-0 right-3">
        Address: {address}
      </Typography>
      <Typography variant="h2">Welcome to TBC</Typography>
      <Typography variant="h4"> Your current status:</Typography>
      {!hasBalance && !isOptedIn && (
        <>
          <Typography variant="h4"> No Membership Requested</Typography>
          <button
            className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={optInToAsset}
          >
            Opt In Now!
          </button>
        </>
      )}

      {isOptedIn && !hasBalance && (
        <Typography variant="h4">
          Waiting for a board members approval...
        </Typography>
      )}

      {hasBalance && (
        <Typography variant="h4">You are an active member.</Typography>
      )}
    </>
  );
};

export default Home;
