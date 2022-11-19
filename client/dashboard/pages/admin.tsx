import algosdk from "algosdk";
import MyAlgo from "@randlabs/myalgo-connect";
import BasicTable from "../src/components/BasicTable";
import { Typography } from "@mui/material";
import { algodClient, ASSET_ID, indexerClient } from "../src/utils/constants";
import React, { useEffect } from "react";
import { getAssetBalanceForAddress, getOptedIn } from ".";

export default function Admin() {
  const address = localStorage.getItem("address");

  const [members, setMembers] = React.useState(null);
  const [applicants, setApplicants] = React.useState(null);

  const myAlgoWallet = new MyAlgo();

  const getMembers = async () => {
    const balances = await getAllAssets();
    balances.filter((balance) => {
      balance.amount > 0;
    });
  };

  const getData = async () => {
    const assetInfo = await indexerClient.lookupAssetBalances(ASSET_ID).do();
    // revoked or already denied
    //const blacklistedAddresses = await bllablalb...

    const toResponse = assetInfo.balances.filter((balance) => {
      return balance.amount == 0; // && not In Revoke List;
    });

    const toDisplay = assetInfo.balances.filter((balance) => {
      return balance.amount > 0;
    });

    return [toResponse, toDisplay];
  };

  useEffect(() => {
    const getTableData = async () => {
      const [toResponseBalances, positiveBalances] = await getData();
      setApplicants(toResponseBalances);
      setMembers(positiveBalances);
    };

    getTableData();
  }, []);

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

  return (
    <>
      <Typography className="m-5 absolute top-0 right-3">{address}</Typography>
      <Typography variant="h2">TBC Admin Area</Typography>

      {members !== null &&
        members.map((member, index) => {
          return (
            <div key={index}>
              <p>{member.amount}</p>
              <p>{member.address}</p>
            </div>
          );
        })}

      {applicants !== null &&
        applicants.map((applicant, index) => {
          return (
            <div key={index}>
              <p>{applicant.amount}</p>
              <p>{applicant.address}</p>
            </div>
          );
        })}

      {/* <button onClick={paymentTransaction}>click</button>
          <button onClick={getAllAssets}>list pls</button>
     */}
    </>
  );
}
