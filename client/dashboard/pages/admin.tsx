import algosdk from "algosdk";
import MyAlgo from "@randlabs/myalgo-connect";
import BasicTable from "../src/components/BasicTable";
import { Typography } from "@mui/material";
import { algodClient, ASSET_ID, indexerClient } from "../src/utils/constants";
import React from "react";
import { getAssetBalanceForAddress, getOptedIn } from ".";

export default function Admin() {
  const address = localStorage.getItem("address");

  const myAlgoWallet = new MyAlgo();

  const getMembers = async () => {
    const balances = await getAllAssets();
    balances.filter((balance) => {
      balance.amount > 0;
    });

    const getRevokedMembers = async () => {
      //   balances.filter(() => {
      //     balance.amount == 0  // && is in revoked list;
      //   });
      // };
    };

    const getRequestingMembers = async () => {
      // balance opted in == 0. and not in the others
    };

    return balances;
  };

  const revokeMembership = async () => {
    /*noop*/
  };
  const grantMembership = async () => {
    /*noop*/
  };

  const paymentTransaction = async () => {
    let txn = await algodClient.getTransactionParams().do();

    try {
      txn = {
        ...txn,
        fee: 1000,
        flatFee: true,
        type: "pay",
        from: address,
        to: "TBN2J7U3J5D4I7R2EK7XIBFNTEGVLHNORAXQ6YBJY5IVNY5IIKOXSJRYCE",
        amount: 100000,
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

  const getAllAssets = async () => {
    try {
      const assetInfo = await indexerClient.lookupAssetBalances(ASSET_ID).do();

      console.log(
        "Information for Asset Name: " + JSON.stringify(assetInfo, undefined, 2)
      );
      return assetInfo;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Typography className="m-5 absolute top-0 right-3">{address}</Typography>
      <Typography variant="h2">TBC Admin Area</Typography>
      <button onClick={paymentTransaction}>click</button>
      <button onClick={getAllAssets}>list pls</button>

      <BasicTable />
    </>
  );
}
