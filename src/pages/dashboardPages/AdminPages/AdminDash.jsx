import React, { useEffect, useState } from 'react';
import { getAdminDashboardDetails } from '../../../services/operations/adminapi';
import { useSelector } from 'react-redux';

const AdminDash = () => {
    const [loading,setLoading]=useState(false);
    const token=useSelector((state)=>state.auth.token);
    useEffect(()=>{
        const fetchData=async (token)=>{
            const response=await getAdminDashboardDetails(token,setLoading);
            if(response)console.log(response,"response");
        }
        fetchData(token);
    },[]);
    return (
        <div>
            
        </div>
    );
}

export default AdminDash;
 