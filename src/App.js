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
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/dashboardPages/DashBoard";
import Profile from "./pages/dashboardPages/Profile";
import Settings from "./pages/dashboardPages/Settings";
import EnrolledCourses from "./pages/dashboardPages/EnrolledCourses";
import WishList from "./pages/dashboardPages/WishList";
import MyCourses from "./pages/dashboardPages/InstructorPages/MyCourses";
import AddCourse from "./components/dashboard/addCourse";
import EditCourse from "./components/dashboard/Instructor/myCourses/EditCourse";
import CatalogPage from "./pages/CatalogPage";
import CourseInfoPage from "./pages/CourseInfoPage";
function App() {
  return (
    <div className="font-inter w-screen overflow-x-hidden min-h-screen bg-richblack-900">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signUp" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verify-email" element={<Verify />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/catalog/:catalogName" element={<CatalogPage/>}></Route>
        <Route path="/course/:courseId" element={<CourseInfoPage/>}></Route>
        <Route
          path="/forgot-password/:id"
          element={<ResetForgotPassword />}
        ></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route path="my-profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="enrolled-courses" element={<EnrolledCourses />} />
          <Route path="wishList" element={<WishList />} />
          <Route path="my-courses" element={<MyCourses />}/>
          <Route path="add-course" element={<AddCourse />} />
          <Route path="edit-course/:courseId" element={<EditCourse />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
