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
  Avatar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
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
function ManagerSignup(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    gender: "",
    hobbies: "",
  });
  //   const [selectedCheckbox, setSelectedCheckbox] = useState([]);
  //   const handleCheckChange = (id) => {
  //     const findIdx = selectedCheckbox.indexOf(id);

  //     let selected;
  //     if (findIdx > -1) {
  //       selected = selectedCheckbox.filter((checkboxId) => checkboxId !== id);
  //     } else {
  //       selected = [...selectedCheckbox, id];
  //     }
  //     setSelectedCheckbox(selected);
  //   };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createUserDocument = async (user, formData) => {
    if (!user) return;

    const { email } = formData;
    const { password } = formData;
    const { fname } = formData;
    const { lname } = formData;
    const { gender } = formData;
    const { hobbies } = formData;

    await setDoc(doc(db, `managerData`, `${user?.user.uid}`), {
      email,
      password,
      fname,
      lname,
      gender,
      hobbies,
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
        if (res) {
          createUserDocument(res, formData);
          console.log("res", res, "hi", formData);
          props.toggle();
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
    <div>
    <div style={{marginTop:50}}>
      <Container component="main" maxWidth="sm">
        <Card>
          <CardContent>
            <div className="center" style={{textAlign:'center',marginTop:10}}>
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
                <FormControl style={{marginTop:5}}>
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
                <br /> <br />
                {/* <TextareaAutosize
                  aria-label="minimum height"
                  minRows={3}
                  placeholder="Minimum 3 rows"
                  style={{ width: 200 }}
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                /> */}
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
                  <Link className="account" to="/managerLogin">
                     Login
                  </Link>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
    <footer
        className="bg-light text-center text-lg-start"
        style={{ marginTop: 235 }}
      >
        <div className="text-center p-2" style={{ backgroundColor: "black" }}>
          <Link to="/">Login</Link>
        </div>
      </footer>
      </div>
  );
}

export default ManagerSignup;
