import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import UserToggleTab from './UserToggleTab';
import apiConnector from "../../services/apiConnector";
import { auth } from '../../services/apis';

const LoginForm = ({setIsLoggedIn,changeTab}) => {
    const[user,setUser]=useState('Student');
    const [showPass, setshowPass] = useState(false);
    const navigate=useNavigate();

    const userHandler=(e)=>{ 
        if(e.target.value!=user){user==='Student'?setUser('Instructor'):setUser('Student');
        changeTab();    }
    }

    function passHandler(){
        setshowPass(!showPass);
    }

    const [formData,setFormData]=useState({
        email: "",
        password:"",
    })

    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value,
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        setIsLoggedIn(true);
        console.log(formData);
        const response=apiConnector(auth.login,'post',formData).then((response)=>{
            console.log("user login successful",response);
        }).catch((error)=>{
            console.log("user login failed",error);
        });
        toast.success('Logged in successfully');
        navigate("/dashboard")
    }

    return (
        <div className='flex flex-col gap-4'>
            <UserToggleTab user={user} clickHandler={userHandler}/>
            <form onSubmit={submitHandler} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1 insetShadow'>
            <label htmlFor="email">Email Address<span className='text-red-500 text-sm absolute'>*</span></label>
            <input onChange={changeHandler} value={formData.email} className='text-white rounded-md px-3 py-2 w-full outline-none bg-[#161D29]' type="email" required placeholder='Enter email address' name='email' id='email'/>
            </div>  

            <div className='flex flex-col gap-1 relative insetShadow'>
            <label htmlFor="password">Password<span className='text-red-500 text-sm absolute'>*</span></label>
            <div className='flex items-center gap-1  bg-[#161D29] px-3 py-2'>
            <input onChange={changeHandler} value={formData.password} className='text-white rounded-md w-full outline-none bg-[#161D29]' type={showPass?("text"):("password")} required placeholder='Enter Password' name='password' id='password'/>
            <div onClick={passHandler} className='cursor-pointer'>
            {
                showPass?(<FaEyeSlash/>):(   <FaEye/>    )
            }
            </div>
            </div>
            <a href='#' className='absolute -bottom-5 right-0 text-[12px] text-[#47A5C5]'>Forgot Password</a>
            </div>
            <button className='w-full mt-5 py-2 bg-[#FFD60A] text-black rounded-md'>Sign In</button>

            </form>
        </div>
    );
}

export default LoginForm;
