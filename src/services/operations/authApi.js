import toast from "react-hot-toast";
import { setLoading } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import {auth} from '../apis';
import { useDispatch } from "react-redux";
const {SENDOTPAPI,SIGNUPAPI}= auth;
export async function sendOTP(email,dispatch){
    try{

        const response=await apiConnector(SENDOTPAPI,"POST",{email});
        if(response.data.success){
            dispatch(setLoading(false));
            toast.success("otp sent successfully");
        }

    }
    catch(error){
        toast.error("failed to send otp");
    }
}

export async function signup(data,navigate){
    try{
        const response =await apiConnector(SIGNUPAPI,"POST",data);
        toast.success("signup successfull");
        navigate('/login');
    }
    catch(error){
        console.log("error in signup operation",error);
        toast.error("failed to signup");
    }
}