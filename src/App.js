import Signup from './Employee/Signup';
import Login from './Employee/Login';
import ManagerSignup from './Manager/ManagerSignup';
import ManagerLogin from './Manager/ManagerLogin';
import { Route, Routes } from "react-router-dom";
import './App.css';

function App() {

  return (
    <div >
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/managerLogin" element={<ManagerLogin/>} />
        <Route path="/managerSignup" element={<ManagerSignup/> }/>
      </Routes>
    </div>
  );
}

export default App;
