import { useSelector } from "react-redux";
import apiConnector from "../apiConnector";
import { categoryEndpoint } from "../apis";

export async function getAllCategory(dispatch,setLoading) {
    dispatch(setLoading(true));
    const {GET_ALL_CATEGORY_API}=categoryEndpoint;
    try {
        const response=await apiConnector(GET_ALL_CATEGORY_API,'GET');
        if(response.data.success){
            dispatch(setLoading(false));
            return response;
        }
    } catch (error) {
        console.log("error in category fetch",error);
        dispatch(setLoading(false));
    }
}