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

import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"
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

function Signup(props) {
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    hobbies: "",
    type: "",
    uid: "",
  });

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
          toast.success("User Register Successfully");
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
              <center style={{marginBottom:20}}>
                <Typography style={{fontSize:'bold'}}>Sign Up</Typography> 
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

                  <Typography>Gender</Typography>
                  
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
