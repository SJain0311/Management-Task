import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import LockRound from "@mui/material/Icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { query, collection, getDocs, where } from "firebase/firestore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {  toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import {
  Avatar,
  Button,
  CardContent,
  CssBaseline,
  Divider,
  Grid,
} from "@mui/material";
import "../App.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { async } from "@firebase/util";

const initialValues = {
  name: "",
  email: "",
  channel: "",
};
const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  }
  if (!values.channel) {
    errors.channel = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

function Login(props) {
  const Navigate = useNavigate();
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
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const uid = res.user.uid;
      const q = query(collection(db, "employeeData"), where("uid", "==", uid));
      const docs = await getDocs(q);
      const type = docs.docs[0].data().type;
      console.log(type);
      if (type) {
        type === "manager" ? Navigate(`/allData`) : Navigate(`/empData/${uid}`);
        toast.success("Successfull Login")
      } else {
        toast.error("No user Found", { type: "error" });
      }
    } catch (err) {
      toast.error("Invalid Credential", { type: "error" });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div>
      <div style={{ marginTop: 50 }}>
        {/* <h2>Login Login</h2> */}
        <Container component="main" maxWidth="xs">
          <Card>
            <CardContent>
              <CssBaseline />
              <div style={{ textAlign: "center" }}>
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
                  <br />
                  <Button type="submit" variant="contained">
                    Login
                  </Button>
                  <br />
                  <br />
                  <Divider />
                  <Grid>
                    <p> Don't have an account</p>
                    <Link to="/signup" className="account">
                      Sign Up
                    </Link>
                  </Grid>
                </form>
              </div>
            </CardContent>
          </Card>
        </Container>
      </div>
    </div>
  );
}

export default Login;