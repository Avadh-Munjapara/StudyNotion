import React from 'react';
import SubmitBtn from '../../comman/SubmitBtn';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateDP } from '../../../services/operations/profileApi';

const ChangeDP = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const image = useSelector((state) => state.profile.user.image);

  const clickHandler = (data) => {
    console.log("dp file", data.displayPicture[0]);
    // Create FormData to send the file
    const formData = new FormData();
    formData.append("displayPicture", data.displayPicture[0]);
    dispatch(updateDP(formData)); // Pass FormData instead of plain object
  };

  return (
    <div className="flex p-6 ml-20 mr-64 mt-10 mx-auto rounded-xl items-center bg-richblack-800 gap-5">
      <img src={image} className="w-[78px] h-[78px] rounded-full" alt="" />
      <form
        onSubmit={handleSubmit(clickHandler)}
        className="flex flex-col gap-3"
        encType="multipart/form-data" // Important for file uploads
      >
        <label htmlFor="displayPicture" className="hover:cursor-pointer font-medium text-[#DBDDEA]">
          Change Profile Picture
        </label>
        <input
          {...register('displayPicture', { required: true })}
          type="file"
          id="displayPicture"
          className="hidden"
        />
        <div>
          <SubmitBtn text="Change" />
        </div>
      </form>
    </div>
  );
};

export default ChangeDP;