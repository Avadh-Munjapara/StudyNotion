import React, { useState } from 'react';
import SubmitBtn from '../../comman/SubmitBtn';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateDP } from '../../../services/operations/profileApi';
import { MdOutlineFileUpload } from "react-icons/md";
import useFilePreview from '../../../hooks/useFilePreview';
const ChangeDP = () => {
  const { register, handleSubmit,formState:{errors},watch,reset } = useForm();
  const dispatch = useDispatch();
  const file=watch('displayPicture');
  const [filePreview,setFilePreview]=useFilePreview(file); 
  const image = useSelector((state) => state.profile.user.image);
  const clickHandler = (data) => {
    // console.log("dp file", data.displayPicture[0]);
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("displayPicture", data.displayPicture[0]);
    dispatch(updateDP(formData)); // Pass FormData instead of plain object
    setFilePreview(null);
  };

  return (
    <div className="flex p-6 ml-20 mr-64 mt-10 mx-auto rounded-xl items-center bg-richblack-800 gap-5">
      <img src={image} className="w-[78px] h-[78px] rounded-full" alt="" />
      <form
        onSubmit={handleSubmit(clickHandler)}
        className="flex flex-col gap-3 w-full"
        encType="multipart/form-data" // Important for file uploads
      >
        <h2  className=" font-medium text-[#DBDDEA]">
          Change Profile Picture
        </h2>
      
        <div className='flex justify-between w-full'> 
          <div className='flex gap-3 items-center'>
            {
              filePreview && <img className='h-10 rounded-full w-10' src={filePreview} alt="preview image" />
            }
        <label htmlFor="displayPicture"
          className="bg-[#FFD60A] flex gap-1 items-center  hover:cursor-pointer self-end rounded-lg font-medium py-[6px] px-[18px]"
        >
          <MdOutlineFileUpload className='text-xl'/>
          Upload
        </label>
        <input
          {...register('displayPicture', { required:{value:true,message:"select picture"} })}
          type="file"
          id="displayPicture"
          className="hidden"
        />
          </div>
          <SubmitBtn text="Save" />
        </div>
        {errors.displayPicture && <p className='text-sm text-red-600'>{errors.displayPicture.message}</p>}
      </form>
    </div>
  );
};

export default ChangeDP;