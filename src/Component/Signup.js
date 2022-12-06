import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import {
  Divider,
  Button,
  CardContent,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { ToastContainer, toast } from "react-toastify";
import firebase from "../firebaseConfig";
import { auth } from "../firebaseConfig";
import { async } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
const checkboxes = [
  { id: 1, text: "Reading" },
  { id: 2, text: "Watching Movie" },
  { id: 3, text: "Dancing" },
  { id: 4, text: "Swimming" },
];
function Signup(props) {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    hobbies: [],
    type: "",
    uid: "",
  });
  const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  // const handleCheckChange = (e,id) => {
  //   const findIdx = selectedCheckbox.indexOf(id);
  //   let selected;
  //   if (findIdx > -1) {
  //     selected = selectedCheckbox.filter((checkboxId) => checkboxId !== id);
  //   } else {
  //     selected = [...selectedCheckbox, id];
  //   }
  //   setSelectedCheckbox(selected);
  // };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUserDocument = async (user, formData, selectedCheckbox) => {
    if (!user) return;

    const { email } = formData;
    const { password } = formData;
    const { fname } = formData;
    const { lname } = formData;
    const { city } = formData;
    const { salary } = formData;
    const { hobbies } = formData;
    const { gender } = formData;
    const { type } = formData;
    const uid = user.user.uid;

    // var { hobbies } =selectedCheckbox;
    await setDoc(doc(db, `employeeData`, `${user?.user.uid}`), {
      email,
      fname,
      lname,
      gender,
      type,
      uid,
      salary,
      city,
      hobbies,
      dept: "",
      createdAt: new Date(),
      // hobbies,
      //   createdAt: new Date(),
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("email", formData.email, "pass", formData.password);
    await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    )
      .then((res) => {
        Navigate("/");
        if (res) {
          createUserDocument(res, formData);
          console.log("res", res, "hi", formData);
          // props.toggle();
          toast.success("User Register Successfully");
          // Navigate("/");
        }
      })
      .catch((error) => {
        console.log("error", error);
        switch (error.code) {
          case "email-already-use-in":
            toast.error(error.message);
            break;
          case "invalid-email":
            toast.error(error.message);
            break;
        }
      });
  };
  return (
    <div style={{ marginTop: 50 }}>
      <Container component="main" maxWidth="sm">
        <Card>
          <CardContent>
            <div
              className="center"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              <center>
                <h3>Sign Up</h3>
              </center>
              <form onSubmit={(e) => handleSignUp(e)}>
                <TextField
                  style={{ marginRight: "20px" }}
                  name="fname"
                  id="outlined-basic"
                  label="Enter First Name"
                  type="text"
                  variant="outlined"
                  //   validators={["required", "isEmail"]}
                  value={formData.fname}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  name="lname"
                  id="outlined-basic"
                  label="Enter Last Name"
                  type="text"
                  //   validators={["required", "isEmail"]}
                  value={formData.lname}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br /> <br />
                <TextField
                  style={{ marginRight: "20px" }}
                  name="email"
                  id="outlined-basic"
                  label="Enter Email"
                  type="email"
                  validators={["required", "isEmail"]}
                  value={formData.email}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <TextField
                  id="filled-basic"
                  name="password"
                  variant="outlined"
                  type="password"
                  label="Enter password"
                  value={formData.password}
                  required
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
                <br />
                <br />
                <TextField
                  style={{ marginRight: "20px" }}
                  id="outlined-basic"
                  name="city"
                  value={formData.city}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="City"
                  variant="outlined"
                />
                <TextField
                  style={{ marginRight: "20px" }}
                  id="outlined-basic"
                  name="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Salary"
                  variant="outlined"
                />
             
                <FormControl style={{ marginTop: 5 }}>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="gender"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
                <Typography>Hobbies</Typography>
                <TextField
                  style={{ marginRight: "20px" }}
                  id="outlined-basic"
                  minRows={1}     
                  name="hobbies"
                  type="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  label="Hobbies"
                  variant="outlined"
                />
                
                <br /> <br />
                <FormControl>
                  <Typography>Job Designation</Typography>
                  <RadioGroup
                    row
                    name="type"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <FormControlLabel
                      value="employee"
                      control={<Radio />}
                      label="Employee"
                    />
                    <FormControlLabel
                      value="manager"
                      control={<Radio />}
                      label="Manager"
                    />
                  </RadioGroup>
                </FormControl>
                {/* <div className="chechBox mt-4">
                  <p>Blog Type Select</p>
                  {checkboxes.map((checkbox) => (
                    <label key={checkbox.id}>
                      {checkbox.text}
                      <input
                        value={checkbox.id}
                        type="checkbox"
                        onChange={(e) => handleCheckChange(e,checkbox.text)}
                        selected={selectedCheckbox.includes(checkbox.text)}
                      />
                    </label>
                  ))}
                </div> */}
                <br />
                <br />
                <Button type="submit" variant="contained">
                  Sign Up
                </Button>
                <br />
                <br />
                <Divider />
                <Grid>
                  <p>Already account</p>
                  <Link className="account" to="/">
                    Login
                  </Link>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}

export default Signup;
