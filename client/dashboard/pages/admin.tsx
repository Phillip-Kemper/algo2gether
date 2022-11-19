import algosdk from "algosdk";
import MyAlgo from "@randlabs/myalgo-connect";

export default function Admin() {
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
      // const assetInfo = await indexerClient
      //   .searchForAssets()
      //   .name("DevDocsCoin")
      //   .do();
      const assetIndex = 2044572;
      let assetInfo = await indexerClient.lookupAssetBalances(assetIndex).do();

      console.log(
        "Information for Asset Name: " + JSON.stringify(assetInfo, undefined, 2)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button onClick={paymentTransaction}>click</button>
      <p> hi </p>
      <button onClick={getAllAssets}>list pls</button>
    </>
  );
}
