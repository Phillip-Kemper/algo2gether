import { Grid, MenuItem, Select, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MyAlgo from "@randlabs/myalgo-connect";
import { waitForConfirmation } from "algosdk";
import { algodClient, ASSET_ID } from "../utils/constants";

const transferAssetToAddress = async (toAddress) => {
  const myAlgoWallet = new MyAlgo();
  try {
    let txn = await algodClient.getTransactionParams().do();

    txn = {
      ...txn,
      fee: 1000,
      flatFee: true,
      type: "axfer",
      assetIndex: ASSET_ID,
      //from Admin to user Address
      from: localStorage.getItem("address"),
      to: toAddress,
      amount: 1,
      note: new Uint8Array(Buffer.from("Coin Master")),
    };

    // txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    //   suggestedParams: { ...txn },
    //   fee: 1000,
    //   flatFee: true,
    //   type: "axfer",
    //   assetIndex: ASSET_ID,
    //   //from Admin to user Address
    //   from: localStorage.getItem("address"),
    //   to: toAddress,
    //   amount: 1,
    //   note: new Uint8Array(Buffer.from("Coin Master")),
    // });

    // console.log(txn);

    // let freezeTxn = await algodClient.getTransactionParams().do();

    // let fTxn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject({
    //   suggestedParams: { ...freezeTxn },
    //   fee: 1000,
    //   flatFee: true,
    //   type: "afrz",
    //   assetIndex: ASSET_ID,
    //   //from Admin to user Address
    //   from: localStorage.getItem("address"),
    //   manager: localStorage.getItem("address"),
    //   reserve: localStorage.getItem("address"),
    //   freeze: localStorage.getItem("address"),
    //   clawback: localStorage.getItem("address"),
    //   freezeTarget: toAddress,
    //   freezeState: true,
    // });

    //let transactions = [txn, fTxn];

    //const groupID = algosdk.computeGroupID(transactions);
    //    transactions[0].group = groupID;
    //   transactions[1].group = groupID;

    const signedTxn = await myAlgoWallet.signTransaction(txn);
    // const signedTxn = await myAlgoWallet.signTransaction(
    //   transactions.map((txn) => txn.toByte())
    // );

    //const signedTxn2 = await myAlgoWallet.signTransaction(fTxn);

    // let signed_transactions = [];
    // signed_transactions.push(signedTxn);
    // signed_transactions.push(signedTxn2);

    console.log(signedTxn);
    console.log(signedTxn.blob);

    await algodClient.sendRawTransaction(signedTxn.blob).do();
    await waitForConfirmation(algodClient, signedTxn.txID, 10);
    window.location.reload();
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};

export default function ApplicantTable({ rows }: { rows: any }) {
  const reject = async (address) => {
    console.log("hihe");
    try {
      await fetch("/api/blacklist/" + address, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("naaa");
    } catch (error) {
      console.log(error);
    }

    // revoke on mongo then dont display anymore
  };
  return (
    <TableContainer
      className="background-white"
      style={{ background: "white" }}
      component={Paper}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Algorand Address</TableCell>
            <TableCell align="right">Opted In</TableCell>
            <TableCell align="right">Designated Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <TableRow
              key={row.address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Typography style={{ fontFamily: "Monospace" }}>
                  {row.address}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row["opted-in-at-round"]}</Typography>
              </TableCell>
              <TableCell align="right">
                <Select style={{ width: "50%" }}>
                  <MenuItem value={"member"}>
                    <Typography>Member </Typography>
                  </MenuItem>
                  <MenuItem value={"moc"}>
                    <Typography>Coin Master</Typography>
                  </MenuItem>
                  <MenuItem value={"promoter"}>
                    <Typography> Promoter </Typography>
                  </MenuItem>
                </Select>
              </TableCell>
              <TableCell align="right">
                <Grid
                  justifyContent="flex-end"
                  container
                  direction="row"
                  spacing={"4"}
                >
                  <Grid item>
                    <button
                      onClick={() => transferAssetToAddress(row.address)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Approve
                    </button>
                  </Grid>
                  <tr />

                  <Grid item>
                    <button
                      onClick={async () => {
                        await reject(row.address);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Reject
                    </button>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
