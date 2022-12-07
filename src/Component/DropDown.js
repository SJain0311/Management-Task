import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import { doc, updateDoc } from "firebase/firestore";
import MenuItem from "@mui/material/MenuItem";
import { db } from "../firebaseConfig";
import { Select } from "@mui/material";

function DropDown({ data }) {
  const [depts, setDepts] = useState("");
  const handleChange = (e, uid) => {
    console.log("e", e, uid);
    updateDept(uid, e.target.value);
    setDepts(e.target.value);
  };
  //dept ===e.target.value
  const updateDept = async (uid, depts) => {
    const blogRef = doc(db, `employeeData`, `${uid}`);
    await updateDoc(blogRef, {
      dept: depts,
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    // console.log(data);
    setDepts(data.dept);
  }, [data.dept]);
  return (
   
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={depts}
          onChange={(e) => {
            handleChange(e, data.id);
          }}
          // label="Age"
        >
          <MenuItem value={"HR"}>HR</MenuItem>
          <MenuItem value={"Sales"}>Sales</MenuItem>
          <MenuItem value={"It"}>IT</MenuItem>
        </Select>
      </FormControl>
  
  );
}

export default DropDown;