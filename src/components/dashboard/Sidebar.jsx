import React from "react";
import { sidebarLinks } from "../../data/dashboard-links";
import { NavLink } from "react-router-dom";
import SideBarLink from "./SideBarLink";
import { CiSettings } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
const Sidebar = () => {
  const location = useLocation();
  const role = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).role
    : null;
  const matchRoute = (path) => {
    return location.pathname === path;
  };
  return (
    <div className="max-w-[222px] py-5 flex flex-col gap-2">
      <div className="">
        {sidebarLinks.map((item, index) => {
          return <SideBarLink link={item} key={item.id} />;
        })}
      </div>
      <div className="w-[calc(100%-2rem)] mx-auto px-4 h-[1px] bg-[#2C333F]"></div>
      <div>
        <NavLink
          to={"/dashboard/settings"}
          className={({ isActive }) => {
            return `${
              isActive
                ? "active pl-4 relative flex font-medium gap-2 items-center p-1"
                : "pl-4 flex relative gap-2 font-medium  items-center text-richblack-300 p-1"
            } }`;
          }}
        >
          <CiSettings />
          <span
            className={`${
              matchRoute("/dashboard/settings") ? "visible" : "invisible"
            } absolute bg-[#FFD60A] w-1 left-0 bottom-0 h-full`}
          ></span>
          Settings{" "}
        </NavLink>
      </div>
      <button className="pl-4 flex gap-2 font-medium  items-center text-richblack-300 ">
      <MdOutlineLogout />
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
