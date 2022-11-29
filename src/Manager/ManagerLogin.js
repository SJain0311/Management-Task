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
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";

import {
  Avatar,
  Button,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import "../App.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";

function ManagerLogin(props) {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleCheck = (e) => {
    setRememberMe(e.target.checked);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        alert("User Login Successfully");
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div style={{ marginTop: 50 }}>
      {/* <h2>Login Login</h2> */}
      <Container component="main" maxWidth="xs">
        <Card>
          <CardContent>
            <CssBaseline />
            <div style={{textAlign:'center'}}>
              <center>
              <h3>Login</h3>
              </center>
              <form onSubmit={(e) => handleLogin(e)}>
                <TextField
                  name="email"
                  label="Enter Email"
                  type="email"
                  variant="outlined"
                  validators={["required", "isEmail"]}
                  value={email}
                  required
                  onChange={(e) => {
                    handleEmail(e);
                  }}
                />
                <br />
                <br />
                <TextField
                  id="filled-basic"
                  name="password"
                  variant="outlined"
                  type="password"
                  label="Enter password"
                  value={password}
                  required
                  onChange={(e) => {
                    handlePassword(e);
                  }}
                />
                <br />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={rememberMe}
                      onChange={(e) => handleCheck(e)}
                    />
                  }
                  label="Remember Me"
                ></FormControlLabel>
                <br />
                <br />
                <Button type="submit" variant="contained">
                  Login
                </Button>
                <br />
                <br />
                <Divider />
                <Grid>
                  <p> Don't have an account</p>
                  <Link onClick={props.toggle} to="/managerSignup" className="account">
                    Sign Up
                  </Link>
                </Grid>
              </form>
            </div>
          </CardContent>
        </Card>
      </Container>
      {/* <form>
        <TextField
          name="fname"
          label="Enter First Name"
          variant="filled"
          value={formData.fname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <br />
        <TextField
          id="filled-basic"
          name="lname"
          variant="filled"
          label="Enter Last Name"
          value={formData.lname}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {/* <h2>hi {formData.fname}</h2>
        <h2>hi {formData.lname}</h2> */}
      {/* <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl> */}
      {/* <FormGroup sx={{ textAlign: "center" }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
            className="center"
            sx={{ textAlign: "center" }}
          />
        </FormGroup>
        <Button variant="contained">Submit</Button> */}
      {/* </form> */}
      <footer
        className="bg-light text-center text-lg-start"
        style={{ marginTop: 244 }}
      >
        <div className="text-center p-2" style={{ backgroundColor: "blue" }}>
          <Link to="/">Login</Link>
        </div>
      </footer>
    </div>
  );
}

export default ManagerLogin;