import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableRows } from "@mui/icons-material";
// import { setRows } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";
import { db } from "../firebaseConfig";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

function AllData() {
  // const rows = [
  //   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //   createData("Eclair", 262, 16.0, 24, 6.0),
  //   createData("Cupcake", 305, 3.7, 67, 4.3),
  //   createData("Gingerbread", 356, 16.0, 49, 3.9),
  // ];
  const [rows, setRows] = useState([]);
  const handleData = async () => {
    const booking = collection(db, "employeeData");
    const snapshot = await getDocs(booking);

    const result = snapshot.docs.map((doc) => doc.data());

    setRows(result);
    console.log(rows);
    return result;
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <Container component="main" maxWidth="md">
        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "black" }}>
                <TableCell style={{ color: "white " }}>Fname</TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Lname
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Email
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Gender
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fname}
                  </TableCell>
                  <TableCell align="right">{row.lname}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
            <TableBody>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default AllData;
