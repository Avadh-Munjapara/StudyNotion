import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
   <div className="font-inter">
    <Routes>
      <Route path="/" element={<Home/>}></Route>
    </Routes>
   </div>
   
  );
}

export default App;
