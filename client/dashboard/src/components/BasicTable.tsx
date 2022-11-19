import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  address: string,
  notes: string,
  memberSince: string,
  role: string,
  actions: number
) {
  return { address, notes, memberSince, role, actions };
}

const rows = [
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    "Met at Meet Up",
    "This is space",
    "Member",
    5
  ),
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    "Met at Meet Up",
    "This is space",
    "Member",
    5
  ),
  createData(
    "XXRBLKSVRI5UDNVFCUZMQ4JR4JXXIG75UU4M6WMQPRLZ4ZHYOY3GBNTECM",
    "Met at Meet Up",
    "This is space",
    "Member",
    5
  ),
];

export default function BasicTable() {
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
            <TableCell align="right">Notes</TableCell>
            <TableCell align="right">Member Since</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.address}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.address}
              </TableCell>
              <TableCell align="right">{row.notes}</TableCell>
              <TableCell align="right">{row.memberSince}</TableCell>
              <TableCell align="right">{row.role}</TableCell>
              <TableCell align="right">
                <button>Approve</button>
                <tr />
                <button>Reject</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
