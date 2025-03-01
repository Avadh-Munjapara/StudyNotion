import React, { use, useEffect } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchRoutes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import apiConnector from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";
import { courses } from "../../services/apis";
import { useState } from "react";
import axios from "axios";
const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiConnector(courses.totalCourses,"get")
      .then((response) => {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const token=useSelector((state)=> state.auth.token);
  const totalItems=useSelector((state)=> state.cart.totalItems);
  console.log("token",token);
  const location=useLocation();
  return (
    <div className="w-full bg-richblack-900 border-b-[0.5px] flex  border-richblack-500 h-14">
      <div className="w-11/12 mx-auto flex justify-between items-center">
        <div>
          <img src={logo} alt="" />
        </div>
        <nav className="">
        <ul className="flex gap-5">
          {
            NavbarLinks.map((item,index)=>{
                return <li key={index}>    
                    {item.title === 'Catalog'
                    ? <div className="text-richblack-200 relative group cursor-pointer">
                     <div className="flex gap-1 items-center">
                     Catalog<IoIosArrowDropdown />
                     </div>
                      <div className="group-hover:visible invisible absolute px-5 left-0 top-8 rounded-xl py-3 text-black bg-richblack-25">
                        <div className="z-10 relative">

                      {
                        categories.length===0
                        ?('No Categroies have been created')
                        :(
                        categories.map((category, index) => {
                          return <li key={index}>{category.name}</li>
                        })
                      )
                      }
                        </div>
                          
                      <div className="bg-richblack-25 h-10 w-10 absolute top-0 left-12 rotate-45">

                      </div>
                      </div>
                    </div>
                    : <Link className={`${location.pathname===`${item.path}`?"text-yellow-5":"text-richblack-200"}`} to={item.path}>{item.title}</Link>}
                </li>
            })
          }
        </ul>  
        </nav>
          {
            token===null?(
              <div className="flex gap-4">
              <Link className="bg-richblack-800 text-richblack-50 px-4 py-2 border-richblack-600 
              rounded-lg border-[1px]" to="/login">
                Login
              </Link>
              <Link className="bg-richblack-800 text-richblack-50 px-4 py-2 border-richblack-600 
              rounded-lg border-[1px]" to="/signup">
              Signup
            </Link>
              </div>
            ):(
              <div className="flex gap-4">
                <div className="relative">
                <IoCartOutline className="text-white h-8 w-8"/>
                {
                  totalItems===0
                  ?("")
                  :(<div className="h-4 w-4 rounded-full absolute right-0 
                    text-xs text-black -top-1 ball_animation bg-green-400 flex justify-center items-center">{totalItems}</div>
                    )
                }
              </div>
              <FaRegCircleUser className="text-white h-8 w-8" />
              </div>
            )
          }
      </div>
    </div>
  );
};

export default NavBar;
