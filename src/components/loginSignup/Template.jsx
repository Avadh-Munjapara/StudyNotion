import React, { useState } from 'react';
import frame from '../../assets/Images/frame.png'
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import {FcGoogle} from "react-icons/fc"
import ItalicText from './ItalicText';

const Template = ({type,insLoginImg,stLoginImg,stSignImg,insSignImg,setIsLoggedIn}) => {
    const [userType,setUserType]=useState('student');
    const changeTab=()=>{
        if(userType=='student')
        setUserType('instructor');
    else setUserType('student');
    }

    const setImg =()=>{
        if(userType==='student'&&type==='login') return stLoginImg;
        else if(userType==='student'&&type==='signup') return stSignImg;
        else if(userType==='instructor'&&type==='signup') return insSignImg ;
        else if(userType==='instructor'&&type==='login') return insLoginImg;
        
    }

    return (
        <div className='min-h-[calc(100vh-65.33px)] py-12 text-white w-[85vw] mx-auto flex justify-between'>
        <div className='flex flex-col gap-4 w-[40%]'>
            <div>
            <p className='text-3xl font-semibold'>{type==='login'?"Welcome Back":
            userType==='student'?"Join the millions learning to code with StudyNotion for free":
            "Join the StudyNotion to utilize your skills for free"}</p>
            <p className='text-[#9FA2AF] text-lg'>{userType==='student'?
            "Build skills for today, tomorrow, and beyond ":
            "Discover your Passions,"}{userType=='student'?<ItalicText text={'Education to future-proof your career.'}/>:''}</p>
            {userType=='instructor'?<ItalicText text={' Be Unstoppable'}/>:''}
            </div>
           

            {
                type==='signup'?(<SignupForm changeTab={changeTab} setIsLoggedIn={setIsLoggedIn}></SignupForm>
                ):(<LoginForm changeTab={changeTab} setIsLoggedIn={setIsLoggedIn}></LoginForm>)
            }
            <div className='flex items-center gap-2'>
            <div className='w-[calc(50%)] h-[0.7px] bg-white'></div>
            <p className='w-fit'>OR</p>
            <div className='w-[calc(50%)] h-[0.7px] bg-white'></div>
            </div>
            
            <button className='flex w-full border-2 justify-center py-2 items-center gap-1'><FcGoogle/> Sign with Google</   button>
        </div>
        <div className='self-center'>
            <div className="relative"> 
            <img className='h-[351px] w-[390px] absolute right-5 bottom-5' src={setImg()} alt="" />
            <img className='h-[351px] w-[390px]' src={frame} alt="" />
            </div>
          
        </div>

        </div>
    );
}

export default Template;
