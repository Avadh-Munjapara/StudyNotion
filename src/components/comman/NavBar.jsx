import React, { use, useEffect, useRef } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchRoutes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import apiConnector from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";
import { courses } from "../../services/apis";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { logout } from "../../services/operations/authApi";
const NavBar = () => {
  const boxRef=useRef(null);
  const [categories, setCategories] = useState([]);
  const navigate=useNavigate();
  const user=useSelector((state)=>state.profile.user);
const dispatch=useDispatch();
  useEffect(() => {
    apiConnector(courses.totalCourses,"get")
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const token=useSelector((state)=> state.auth.token);
  const totalItems=useSelector((state)=> state.cart.totalItems);
  const showBox=()=>{
    if(boxRef.current.classList.contains('invisible')){
      boxRef.current.classList.remove("invisible");
      boxRef.current.classList.add("visible");
    }else{
      boxRef.current.classList.add("invisible");
      boxRef.current.classList.remove("visible");
    }
  }

  const logoutHandler=(e)=>{
    dispatch(logout(navigate));
  }
  const location=useLocation();
  return (
    <div className="w-full bg-richblack-900 border-b-[0.5px] flex  border-richblack-500 h-14">
      <div className="w-11/12 mx-auto flex justify-between max-w-maxContent items-center">
        <div className="">
          <img className="w-40 h-8" src={logo} alt="" />
        </div>
        <nav className="invisible md:visible">
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
                          return <div key={index}>{category.name}</div>
                        })
                      )
                      }
                        </div>
                          
                      <div className="bg-richblack-25 h-10 w-10 absolute top-0 left-12 rotate-45">

                      </div>
                      </div>
                    </div>
                    : <Link className={`${location.pathname===`${item.path}`?"text-[#FFD60A] font-bold":"text-richblack-200"}`} to={item.path}>{item.title}</Link>}
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
              
                <div className="relative ">
                <IoCartOutline className="text-white cursor-pointer h-8 w-8"/>
                {
                  totalItems===0
                  ?("")
                  :(<div className="h-4 w-4 rounded-full absolute right-0 
                    text-xs text-black -top-1 ball_animation bg-green-400 flex justify-center items-center">{totalItems}</div>
                    )
                }
              </div>
              <div className="relative cursor-pointer" onClick={showBox}>
              <div className="text-white rounded-full h-8 w-8 "style={{backgroundImage: `url(${user?.image})`}} >
              </div>
              <div ref={boxRef} onClick={logoutHandler} className="flex gap-1 items-center  right-0 -bottom-14 invisible  text-richblack-200 absolute bg-richblack-700 px-3 py-2 ">
              <MdLogout />
              Logout
              </div>
              </div>
              </div>
            )
          }
      </div>
    </div>
  );
};

export default NavBar;
