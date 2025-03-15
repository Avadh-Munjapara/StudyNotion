import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../services/operations/profileApi';
const DeleteAccount = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const clickHandler=(e)=>{
        dispatch(deleteAccount(navigate));
    }
    return (
        <div className='bg-[#340019] p-6 mt-10 border ml-20 mr-64 border-[#691432] flex gap-4 '>
            <div className='bg-[#691432] p-4 rounded-full h-fit w-fit flex justify-center items-center'>
            <RiDeleteBinLine className='w-5 h-6 text-[#EF476F]' />
            </div>
            <div className='flex flex-col gap-[2px]'>
                <h3 className='text-lg font-bold text-richblack-5'>Delete Account</h3>
                <p className='text-[#FBC7D1] font-medium'>Would you like to delete account?</p>
                <p className='text-[#FBC7D1] font-medium'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>
                <button onClick={clickHandler} className='text-[#D43D63] italic font-medium self-start'>I want to delete my account.</button>
            </div>
        </div>
    );
}

export default DeleteAccount;
