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
import { useNavigate, useParams } from "react-router-dom";


function EmpData() {
  const { uid } = useParams();
  const Navigate = useNavigate();
  const [rows, setRows] = useState([]);
 
  const handleData = async () => {
    try {
      const blog = query(
        collection(db, "employeeData"),
        where("uid", "==", uid),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(blog);
      const rows = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(rows.uid);
      setRows(rows);

      return rows;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleData();
  },[uid]);
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
                <TableCell style={{ color: "white " }} align="right">
                  City
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                Salary
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                Department
                </TableCell>
              </TableRow>
            </TableHead>
            {/* <TableRow key={row?.name}>
    </TableRow> */}
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.fname}</TableCell>
                  <TableCell align="right">{row.lname}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  {/* <TableCell align="right">{row.hobbies}</TableCell> */}
                  <TableCell align="right">{row.city}</TableCell>
                  <TableCell align="right">{row.salary}</TableCell>
                  <TableCell align="right">{row.dept}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default EmpData;
