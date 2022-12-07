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
  orderBy,
  startAt,
  startAfter,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import DropDown from "../Component/DropDown";

function AllData(props) {
  const { formData } = props;
  const Navigate = useNavigate();
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
    let check = e.target.value;
    if (check == "1") {
      console.log("1");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "HR"),
        orderBy("salary")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(checkQuery);
      setRows(checkQuery);
      // setcheck(checkQuery);
      return checkQuery;
    } else if (check == "2") {
      console.log("2");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        orderBy("salary", "desc")
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
    } else if (check == "3") {
      console.log("3");
      const queryRef = query(
        collection(db, "employeeData"),
        where("city", "==", "Surat"),
        where("dept", "==", "It"),
        where("type", "==", "employee")
      );
      const snapshot = await getDocs(queryRef);
      console.log(snapshot);
      const checkQuery = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("check", checkQuery);
      setRows(checkQuery);
    } else if (check == "4") {
      console.log("4");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "It"),
        orderBy("city"),
        startAt(`A`)
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
    } else if (check == "5") {
      console.log("5");
      const queryRef = query(
        collection(db, "employeeData"),
        where("type", "==", "employee"),
        where("dept", "==", "Sales")
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
  const logOut = (e) => {
    e.preventDefault();
    Navigate("/");
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <div>
      <Container component="main">
        <div style={{ marginTop: 30 }}>
          <Typography variant="h6">Filter</Typography>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            onChange={(e) => handleQuery(e)}
            value={querys}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="HR departments with Max salary"
            />

            <FormControlLabel
              value="2"
              control={<Radio />}
              label="IT departments with Min salary"
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label=" IT departments and location is Surat city"
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label=" City name is starting from A"
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label=" Sales departments and descending order of employee name"
            />
          </RadioGroup>
        </div>

        <TableContainer component={Paper}>
          <Table sx={{ Width: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow style={{ background: "Grey" }}>
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
                  Salary
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  City
                </TableCell>
                <TableCell style={{ color: "white " }} align="right">
                  Department
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
      <div style={{ margin: 25 }}>
        <Button variant="outlined" onClick={logOut}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AllData;
