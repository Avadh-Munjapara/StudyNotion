import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
   <div className="font-inter w-screen overflow-x-hidden min-h-screen bg-richblack-900">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
   </div>
   
  );
}

export default App;
