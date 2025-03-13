import React, { useRef } from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { NavLink, useNavigate } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import { VscSignOut } from "react-icons/vsc";
import { useLocation } from "react-router-dom";
import { logout } from "../../services/operations/authApi";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const location = useLocation();
  const modalRef=useRef(null);
  const screenRef=useRef(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const role=localStorage.getItem("user")?JSON.parse(localStorage.getItem('user')).accountType:null;

  const matchRoute = (path) => {
    return location.pathname === path;
  };
  const modalHandler =()=>{
    console.log("current",modalRef.current);
    modalRef.current.classList.toggle("invisible");
    screenRef.current.classList.toggle("invisible");
  }
  const clickHandler=(e)=>{
      dispatch(logout(navigate));
  }
  return (
    <>
     <div className="max-w-[222px]  relative pt-8 bg-richblack-800 flex h-screen  flex-col gap-2">
        <div className="">
          {sidebarLinks.map((item, index) => {
            return item.type===role || item.path==="/dashboard/my-profile" || item.path === "/dashboard/settings"
                ?  <SideBarLink link={item} key={item.id} />:null;
          })}
        </div>
        <div className="w-[calc(100%-2rem)] mx-auto px-4 h-[1px] bg-[#2C333F]"></div>
        <div>
          <SideBarLink link={{"name":"Settigs","icon":"VscSettingsGear","path":"/dashboard/settings"}}/>
        </div>
        <button onClick={modalHandler} className="pl-4 flex gap-2 font-medium  items-center text-richblack-300 ">
          <VscSignOut />
          Log Out
        </button>
        </div>
        {/* modal */}
        <div ref={screenRef}  onClick={modalHandler}  className="invisible w-full h-screen  bg-white/10 top-0 absolute backdrop-blur-sm ">   
        </div>
        <div ref={modalRef} className="text-white border-white border-[1px]  bg-richblack-800 h-fit invisible px-6 rounded-md py-4 gap-3  flex  absolute z-10 left-[40%] top-[45%] flex-col justify-center items-center ">
            <h2 className="text-lg">Do you Really want to <span className="text-red-600 font-semibold">Log Out?</span></h2>
            <div className="flex gap-3" >
              <button className="px-2 py-1 bg-yellow-200 rounded-md" onClick={modalHandler}>
                Cancel
              </button>
              <button onClick={clickHandler} className="px-2 py-1 bg-red-600 rounded-md">
                Log out
              </button>
            </div>
          </div>
    </>   
  );
};

export default Sidebar;
