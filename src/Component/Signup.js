import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import { Paper } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  validateYupSchema,
  useFormik,
} from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Divider, Button, CardContent, Grid, Typography } from "@mui/material";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

const LoginSchema = (values) => {
  const errors = {};
  if (!values.salary) {
    errors.salary = "*This Field is Required";
  } else if (!/^[0-9]+$/i.test(values.salary)) {
    errors.salary = "Only Number Is Accepted";
  }
  if (!values.fname) {
    errors.fname = "*This Field is Required";
  } else if (values.fname.length > 15) {
    errors.fname = "Must be 15 characters or less";
  }

  if (!values.lname) {
    errors.lname = "*This Field is Required";
  } else if (values.lname.length > 20) {
    errors.lname = "Must be 20 characters or less";
  }

  if (!values.city) {
    errors.city = "*This Field is Required";
  }
  if (!values.type) {
    errors.type = "*This Field is Required";
  }

  if (!values.email) {
    errors.email = "*This Field is Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "*This Field is Required";
  } else if (
   
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/i.test(
        values.password
      
    )
  ) {
    errors.password =
      "Must Contain 6 Characters,1 Uppercase,1 Lowercase,1 Number and 1 special Character";
  }
  if (!values.gender) {
    errors.gender = "*This Field is Required";
  }
  if (!values.hobbies) {
    errors.hobbies = "*This Field is Required";
  }
  return errors;
};

function Signup() {
  const Navigate = useNavigate();
  const [flag,setFlag] = useState(false)
  const createUserDocument = async (user, values) => {
    if (!user) return;

    const { email } = values;
    // const { password } = values;
    const { fname } = values;
    const { lname } = values;
    const { city } = values;
    const { salary } = values;
    const { hobbies } = values;
    const { gender } = values;
    const { type } = values;
    const uid = user.user.uid;

    await setDoc(doc(db, `employeeData`, `${user?.user.uid}`), {
      email,
      fname,
      lname,
      gender,
      uid,
      salary,
      city,
      hobbies,
      type,
      createdAt: new Date(),
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log("email", formik.values.email, "pass", formik.values.password);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fname: "",
      lname: "",
      city: "",
      salary: "",
      gender: "",
      hobbies: "",
      type: "",
    },
    validate: LoginSchema,

    onSubmit: async (formik) => {
      await createUserWithEmailAndPassword(auth, formik.email, formik.password)
        .then((res) => {
          Navigate("/");
          if (res) {
            createUserDocument(res, formik);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });
  return (
    <div style={{ marginTop: 50 }}>
      <Container component="main" maxWidth="sm">
        <Card>
          <CardContent>
            <div
              className="center"
              style={{ textAlign: "center", marginTop: 10 }}
            >
              <div>
                <center style={{ marginBottom: 20 }}>
                  <Typography style={{ fontSize: "bold" }}>Sign Up</Typography>
                </center>
                <Formik
                  validationSchema={LoginSchema}
                  // onSubmit={(values) => {
                  //   console.log(values);
                  //   alert("Form is validated! Submitting the form...");
                  // }}
                >
                  {({
                    touched,
                    errors,
                    isSubmitting,
                    values,
                    handleChange,
                    handleBlur,
                  }) => (
                    <Form >
                      <div style={{ display: "flex", marginBottom: -20 }}>
                        <div>
                          <TextField
                            style={{ marginRight: "20px" }}
                            name="fname"
                            id="outlined-basic"
                            label="Enter First Name"
                            type="text"
                            variant="outlined"
                            value={formik.values.fname}
                            onChange={formik.handleChange}
                            className={` form-control
                            ${
                              touched.fname && errors.fname ? "is-invalid" : ""
                            }`}
                          />

                          {flag?formik.errors.fname && (
                            <div style={{ color: "#1976d2" }}>
                              {formik.errors.fname}
                            </div>
                          ):<></>}
                        </div>
                        <div>
                          <TextField
                            name="lname"
                            id="outlined-basic1"
                            label="Enter Last Name"
                            type="text"
                            value={formik.values.lname}
                            onChange={formik.handleChange}
                            className={` form-control
                            ${
                              touched.lname && errors.lname ? "is-invalid" : ""
                            }`}
                          />
                          {console.log(formik.errors)}
                          {flag?formik.errors.lname && (
                            <div style={{ color: "#1976d2" }}>
                              {formik.errors.lname}
                            </div>
                          ):<></>}
                        </div>
                      </div>
                      <br /> <br />
                      <div style={{ display: "flex", marginBottom: -20 }}>
                        <div>
                          <TextField
                            style={{ marginRight: "20px" }}
                            name="email"
                            id="outlined-basic2"
                            label="Enter Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                          {flag?formik.errors.email && (
                            <div style={{ color: "#1976d2" }}>
                              {formik.errors.email}
                            </div>
                          ):<></>}
                        </div>
                        <div>
                          <TextField
                            id="outlined-basic3"
                            name="password"
                            variant="outlined"
                            type="password"
                            label="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {flag?formik.errors.password && (
                            <div style={{ color: "#1976d2", fontSize: 10 }}>
                              {formik.errors.password}
                            </div>
                          ):<></>}
                        </div>
                      </div>
                      <br />
                      <br />
                      <div style={{ display: "flex" }}>
                        <div>
                          <TextField
                            style={{ marginRight: "20px" }}
                            id="outlined-basic4"
                            name="city"
                            label="Enter City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            variant="outlined"
                          />
                          {flag?formik.errors.city && (
                            <div style={{ color: "#1976d2" }}>
                              {formik.errors.city}
                            </div>
                          ):<></>}
                        </div>
                        <div>
                          <TextField
                             id="outlined-basic5"
                            name="salary"
                            type="number"
                            label="Enter Salary"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                            variant="outlined"
                          />
                          {flag?formik.errors.salary && (
                            <div style={{ color: "#1976d2" }}>
                              {formik.errors.salary}
                            </div>
                          ):<></>}
                        </div>
                      </div>
                      <FormControl style={{ marginTop: 5 }}>
                        <Typography>Gender</Typography>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="gender"
                          onChange={formik.handleChange}
                          id="outlined-basic6"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            name="gender"
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            name="gender"
                            label="Male"
                          />
                        </RadioGroup>
                        {flag?formik.errors.gender && (
                          <div style={{ color: "#1976d2" }}>
                            {formik.errors.gender}
                          </div>
                        ):<></>}
                      </FormControl>
                      <br />
                      <br />
                      <Typography>Hobbies</Typography>
                      <TextField
                        style={{ marginRight: "20px" }}
                        id="outlined-basic7"
                        minRows={1}
                        name="hobbies"
                        type="hobbies"
                        value={formik.values.hobbies}
                        onChange={formik.handleChange}
                        label="Hobbies"
                        variant="outlined"
                      />
                      {flag?formik.errors.salary && (
                        <div style={{ color: "#1976d2" }}>
                          {formik.errors.hobbies}
                        </div>
                      ):<></>}
                      <br /> <br />
                      <Typography>Job Designation</Typography>
                      <FormControl>
                        <RadioGroup
                          row
                          name="type"
                          id="outlined-basic8"
                          onChange={formik.handleChange}
                        >
                          <FormControlLabel
                            value="employee"
                            control={<Radio />}
                            label="Employee"
                            name="type"
                          />
                          <FormControlLabel
                            value="manager"
                            control={<Radio />}
                            label="Manager"
                            name="type"
                          />
                        </RadioGroup>
                      </FormControl>
                      {flag?formik.errors.type && (
                        <div style={{ color: "#1976d2" }}>
                          {formik.errors.type}
                        </div>
                      ):<></>}
                      <br />
                      <br />
                      <Button
                        type="submit"
                        variant="contained"
                        id="my-form"
                        onClick={(e)=>{ e.preventDefault();formik.handleSubmit(); setFlag(true) }}
                      >
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
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
      {/* </Paper> */}
    </div>
  );
}

export default Signup;
