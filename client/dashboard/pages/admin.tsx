import { Typography } from "@mui/material";
import MyAlgo from "@randlabs/myalgo-connect";
import React, { useEffect } from "react";
import ApplicantTable from "../src/components/ApplicantTable";
import BasicTable from "../src/components/BasicTable";
import { algodClient, ASSET_ID, indexerClient } from "../src/utils/constants";

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

      const signedTxn = await myAlgoWallet.signTransaction(txn);

      console.log(signedTxn.txID);

      await algodClient.sendRawTransaction(signedTxn.blob).do();
    } catch (error) {
      console.log(error);
    }
  };

  React.useMemo(() => {
    console.log(members);
  }, [members]);

  return (
    <>
      <Typography className="m-5 absolute top-0 right-3">
        Address: {address}
      </Typography>
      <Typography className="mt-10 mb-2" variant="h4">
        TBC Members
      </Typography>

      {members !== null && <BasicTable rows={members} />}

      <Typography className="mt-10 mb-2" variant="h4">
        TBC Applications
      </Typography>

      {applicants !== null && <ApplicantTable rows={applicants} />}

      {/* <button onClick={paymentTransaction}>click</button>
          <button onClick={getAllAssets}>list pls</button>
     */}
    </>
  );
}
