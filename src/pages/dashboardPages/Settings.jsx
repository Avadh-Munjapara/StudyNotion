import React from 'react';
import EditProfile from '../../components/dashboard/EditProfile';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../../services/operations/profileApi';
import Spinner from '../../components/comman/Spinner';
import DeleteAccount from '../../components/dashboard/DeleteAccount';
const Settings = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [profileInformation, setProfileInformation] = useState(null);
    useEffect(() => {
        const fetchUserDetails = async () => {
          dispatch(getUserDetails(setLoading, setProfileInformation));
        };
        fetchUserDetails();
      }, [dispatch]);
    return loading===true ? (<div className='h-full w-full flex justify-center items-center mx-auto'>
        <Spinner/>
                </div>)
                :( <div>
                    <h1 className='pt-6 pl-6 text-richblack-5 font-semibold text-4xl'>Edit Profile</h1>
                    <EditProfile profileInformation={profileInformation?.additionalDetails}/>
                    <DeleteAccount/>
                </div>)
}

export default Settings;
