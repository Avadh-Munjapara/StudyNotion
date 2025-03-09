import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import ResetForgotPassword from "./pages/ResetForgotPassword";
import About from "./pages/About";
import ContactPage from "./pages/ContactPage";
function App() {
  return (
   <div className="font-inter w-screen overflow-x-hidden min-h-screen bg-richblack-900">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/signUp" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/verify-email" element={<Verify/>}></Route>
      <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
      <Route path='/forgot-password/:id' element={<ResetForgotPassword/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/contact' element={<ContactPage/>}></Route>
    </Routes>
   </div>
   
  );
}

export default App;
