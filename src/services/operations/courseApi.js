import apiConnector from "../apiConnector";
import { courseEndPoint } from "../apis";
const{GET_AVG_RATING}=courseEndPoint;
const token=localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null;
export async function getAverageRating(payLoad){
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