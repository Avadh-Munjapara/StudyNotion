import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";

function App() {
  return (
   <div className="font-inter w-screen overflow-x-hidden min-h-screen bg-richblack-900">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signUp" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/verify-email" element={<Verify/>}></Route>
    </Routes>
   </div>
   
  );
}

export default App;
