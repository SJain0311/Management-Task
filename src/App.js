import Signup from "./Component/Signup";
import Login from './Component/Login';
import { Route, Routes } from "react-router-dom";
import AllData from './Manager/AllData';
import './App.css';
import EmpData from "./Employee/EmpData";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/empdata/:uid" element={<EmpData/>}/>
        <Route path="/allData" element={<AllData/>}/>

      </Routes>
      <ToastContainer autoClose={5000}  />
    </div>
  );
}

export default App;
