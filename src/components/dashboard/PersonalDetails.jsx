import React from 'react';
import EditBtn from '../dashboard/EditBtn';
import ShowInfo from '../dashboard/ShowInfo';
import { useNavigate } from 'react-router-dom';
const PersonalDetails = ({userDetails}) => {
    const navigate=useNavigate();
    const clickHandler=()=>{
        navigate('/dashboard/settings');
    }
    return (  
        <div className="pb-10">
        <div className="flex p-6 ml-20 mt-10 w-fit mx-auto rounded-xl items-center  bg-richblack-800 justify-between gap-52">
          <div className="flex text-richblack-5 gap-5">
            <img
              src={userDetails?.image.split(" ").join("?")}
              className="rounded-full w-14 h-14"
              alt=""
            />
            <div>
              <h2>{userDetails?.firstName + "" + userDetails?.lastName}</h2>
              <p>{userDetails?.email}</p>
            </div>
          </div>
          <EditBtn clickHandler={clickHandler} />
        </div>


        <div className="flex flex-col p-6 ml-20 mt-10 w-[641.75px]  mx-auto rounded-xl   bg-richblack-800 gap-5">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-lg font-semibold text-richblack-5">
              About
            </h2>
            <EditBtn clickHandler={clickHandler}/>
          </div>
          <p className='text-sm text-richblack-300'>{userDetails?.additionalDetails?.about||'Write something about your self'}</p>
        </div>

        <div className="flex flex-col p-6 ml-20 mt-10 w-[641.75px]  mx-auto rounded-xl   bg-richblack-800 gap-5">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-lg font-semibold text-richblack-5">
              Personal Details
            </h2>
            <EditBtn clickHandler={clickHandler}/>
          </div>
          <div className="grid grid-cols-2 gap-y-5">
            <ShowInfo
              label="First Name"
              info={userDetails?.firstName}
              text="Enter firstName"
            />
            <ShowInfo
              label="Last Name"
              info={userDetails?.lastName}
              text="Enter lastName"
            />
            <ShowInfo
              label="Email"
              info={userDetails?.email}
              text="Enter email"
            />
            <ShowInfo
              label="Phone Number"
              info={userDetails?.additionalDetails?.phoneNumber?`${userDetails?.additionalDetails?.countryCode} ${userDetails?.additionalDetails?.phoneNumber}`:null}
              text="Enter Phone Number"
            />
            <ShowInfo
              label="Date of Birth"
              info={userDetails?.additionalDetails?.dob?.split('T').at(0).toString().split('-').reverse().join('-')}
              text="Enter your Birthdate"
            />
            <ShowInfo
              label="Gender"
              info={userDetails?.additionalDetails?.gender}
              text="Enter your gender"
            />
          </div>
        </div>
      </div>
    );
}

export default PersonalDetails;
