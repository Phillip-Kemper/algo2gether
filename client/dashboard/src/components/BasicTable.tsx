import { Grid, MenuItem, Select, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MyAlgo from "@randlabs/myalgo-connect";
import { algodClient, ASSET_ID } from "../utils/constants";

function createData(
  address: string,
  //notes: string,
  optedIn: number,
  role: string,
  actions: number
) {
  return { address, optedIn, role, actions };
}

const rows = [
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    21232,
    "Admin",
    5
  ),
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    3223,
    "Member",
    5
  ),
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    2342,
    "Member",
    5
  ),
];

const revoke = async (address) => {
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
      to: localStorage.getItem("address"),
      revocationTarget: address,
      amount: 1,
      note: new Uint8Array(Buffer.from("Revoked")),
    };

    console.log(txn);

    const signedTxn = await myAlgoWallet.signTransaction(txn);

    console.log(signedTxn.txID);

    await algodClient.sendRawTransaction(signedTxn.blob).do();

    try {
      await fetch("/api/blacklist/" + address, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
};
export default function BasicTable({ rows }: { rows: any }) {
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
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Assign New Role</TableCell>
            <TableCell align="right">Revoke Access</TableCell>
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
                <Typography>{row["opted-in-at-round"]} </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{row.role} </Typography>
              </TableCell>
              <TableCell align="right">
                <Select style={{ width: "50%" }}>
                  <MenuItem value={"member"}>
                    <Typography>Member</Typography>
                  </MenuItem>
                  <MenuItem value={"moc"}>
                    <Typography>Coin Master </Typography>
                  </MenuItem>
                  <MenuItem value={"promoter"}>
                    <Typography>Promoter </Typography>
                  </MenuItem>
                </Select>
              </TableCell>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <TableCell>
                    <button
                      onClick={async () => {
                        await revoke(row.address);
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      Revoke
                    </button>
                  </TableCell>
                </Grid>
              </Grid>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
