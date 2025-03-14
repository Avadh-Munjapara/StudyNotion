import apiConnector from "../apiConnector"
import { profileEndpoint } from "../apis";

export function getUserDetails(setLoading,setUserDetails) {
    const {GETUSERDETAILS}=profileEndpoint;
    const token=JSON.parse(localStorage.getItem('token'))||null;
    return async (dispatch)=>{
        setLoading(true);   
        try {
            const response=await apiConnector(GETUSERDETAILS,"GET",{},{
                Authorization:`bearer ${token}`
            });
            if(response.data.success){
                // console.log("user data from db",response);
                setUserDetails(response.data.user);
            }
        } catch (error) {
            console.log("error in getuserdetails operation",error.message);
        }
        setLoading(false);
    }
}