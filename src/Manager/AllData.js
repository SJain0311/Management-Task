import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableRows } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import {
  Button,
  Typography,
  Container,
  Radio,
  FormControl,
  Select,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { db } from "../firebaseConfig";
import {
  query,
  collection,
  getDocs,
  where,
  doc,
  getDoc,
  updateDoc,
  orderBy
} from "firebase/firestore";
import DropDown from "../Component/DropDown";

function AllData( props ) {
  const { formData } = props;
  const [depts, setDepts] = useState("");
  const [rows, setRows] = useState([]);
  const [querys, setQuerys] = useState(null);
  const handleData = async () => {
    const empData = query(
      collection(db, "employeeData"),
      where("type", "==", "employee")
    );
    const snapshot = await getDocs(empData);
    const result = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRows(result);
    console.log(rows);
    return result;
  };
  const handleQuery = async (e) => {
    setQuerys(e.target.value);
    let aa = e.target.value;
    if (aa == "1") {
      console.log("1");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "HR"),
        orderBy("salary", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      return checkQuery;
    } else if (aa == "2") {
      console.log("2");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "IT")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("checkQuery", checkQuery);
      console.log("snapshot", snapshot);
      setRows(checkQuery);
      // setaa(checkQuery);
      // return checkQuery;
    } else if (aa == "3") {
      console.log("3");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "II"),
        where("city", "==", "surat")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("check", checkQuery);
      setRows(checkQuery);
      // setaa(checkQuery);
      // return checkQuery;
    } else if (aa == "4") {
      console.log("4");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        // where("dept", "==", "It"),
        orderBy("city", "", "S")
        // startAt("A" || "a")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(snapshot.docs);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      // return snapshot.docs;
    } else if (aa == "5") {
      console.log("5");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "Sales")
        // orderBy("fname", "==", "desc")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setQuerys(checkQuery);
      return snapshot.docs;
    }
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <FormControl>
        <Typography>Job Designation</Typography>
        <RadioGroup row name="type"  onChange={(e) => handleQuery(e)}
            value={querys}>
          <FormControlLabel
            value="1"
            control={<Radio size="small" />}
            label="Max.Salary in HR Dept."
          />
          <FormControlLabel
            value="2"
            control={<Radio size="small" />}
            label="Min.Salary in IT Dept."
          />{" "}
          <FormControlLabel
            value="3"
            control={<Radio size="small" />}
            label="Employee in IT with Surat"
          />
          <FormControlLabel
            value="4"
            control={<Radio size="small" />}
            label="Employee in IT & city Name with S"
          />{" "}
          <FormControlLabel
            value="5"
            control={<Radio size="small" />}
            label="Employee in Sales Department"
          />
          <FormControlLabel
            value="6"
            control={<Radio size="small" />}
            label="All Employee"
          />
        </RadioGroup>
      </FormControl>
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
                <TableCell style={{ color: "white " }} align="right">Salary</TableCell>
                <TableCell style={{ color: "white " }} align="right">City</TableCell>
                <TableCell style={{ color: "white " }} align="right">Department</TableCell>
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
                  <TableCell align="right">{row.salary}</TableCell>
                  <TableCell align="right">{row.city}</TableCell>
                  <DropDown data={row}></DropDown>
                </TableRow>
              ))}
            </TableBody>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default AllData;
