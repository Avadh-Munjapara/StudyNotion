import { setLoading } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import { courseEndPoint } from "../apis";
import { setStep } from "../../slices/courseSlice";
import toast from "react-hot-toast";

const{GET_AVG_RATING,CREATE_COURSE_API}=courseEndPoint;
const token=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
export async function getAverageRating(payLoad){
    dispatchEvent(setLoading(true));
    try {
        const response=await apiConnector(GET_AVG_RATING,'GET',payLoad,{
            Authorization:`bearer ${token}`
        });
        if(!response.data.success){
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.log('error in getAverageRating api',error);
    }
}

export function createCourse(payLoad,setLoading){
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true));
            const createdCourse=await apiConnector(CREATE_COURSE_API,'POST',payLoad,{
                'Content-Type': 'multipart/form-data',
                Authorization:`bearer ${token}`
            }); 
            if(createdCourse.data.success){
                dispatch(setStep(2));
                toast.success("course created successfully!");
            }
        } catch (error) {
            console.log('error in createCourse api',error);
            toast.error("course not created!");
        }
        dispatch(setLoading(false));
    }
}