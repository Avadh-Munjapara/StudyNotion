import React from "react";
import * as Icons from "react-icons/vsc";
import { NavLink, useLocation } from "react-router-dom";
const SideBarLink = ({link}) => {
  const location=useLocation();
    const Icon=Icons[link.icon];
    const matchRoute=(path)=>{
      return location.pathname===path;
    }
    return <NavLink to={link.path} className={({isActive})=>{
      return `${isActive?'active pl-4 pr-10 w-full relative flex font-medium gap-2 items-center p-1':"pl-4 pr-8 flex relative gap-2 font-medium  items-center text-richblack-300 p-1"} }`} }>
    <Icon/>
    {link.name}
    <span className={`${matchRoute(link.path)?'visible':'invisible'} absolute bg-[#FFD60A] w-1 left-0 bottom-0 h-full`}></span>
  </NavLink>
 ;
};

export default SideBarLink;
