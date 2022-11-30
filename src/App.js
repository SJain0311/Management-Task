import Signup from "./Component/Signup";
import Login from './Component/Login';
import { Route, Routes } from "react-router-dom";
import AllData from './Manager/AllData';
import './App.css';
import EmpData from "./Employee/EmpData";

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/empdata" element={<EmpData/>}/>
        <Route path="/allData" element={<AllData/>}/>

      </Routes>
    </div>
  );
}

export default App;
