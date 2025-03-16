import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { profileEndpoint } from "../apis";
import { setLoading, setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
import { setDP } from "../../slices/profileSlice";
const { GETUSERDETAILS, UPDATEPROFILE, DELETEPROFILE,UPDATEDPAPI } = profileEndpoint;
const token = JSON.parse(localStorage.getItem("token")) || null;

export function getUserDetails(setLoading, setUserDetails) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector(
        GETUSERDETAILS,
        "GET",
        {},
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (response.data.success) {
        // console.log("user data from db",response);
        setUserDetails(response.data.user);
      }
    } catch (error) {
      console.log("error in getuserdetails operation", error.message);
    }
    setLoading(false);
  };
}

export function updateProfile(payload, setLoading) {
  return async (dispatch) => {
    const tId = toast.loading("loading");
    setLoading(true);
    try {
      const response = await apiConnector(UPDATEPROFILE, "PUT", payload, {
        Authorization: `bearer ${token}`,
      });
      if (response.data.success) {
        console.log("successfully updated Profile");
        toast.success("profile Upadted!!!");
        return response.data;
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      console.log("error in updateProfile operaion", error.message);
    }
    setLoading(false);
    toast.dismiss(tId);
  };
}

export function deleteAccount(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(DELETEPROFILE, "DELETE",{},{
        Authorization: `bearer ${token}`,
      });
      if (response.data.success) {
        dispatch(setToken(null));
        dispatch(resetCart());
        dispatch(setUser(null));
        localStorage.clear();
        toast.success("Accont Deleted!");
        navigate('/');
      } else {
        toast.error("something went wrong!");
      }
    } catch (error) {
      console.log("error while deleting account operation", error.message);
    }
  };
}

export function updateDP(formData){
    return async(dispatch)=>{
      const tId=toast.loading('updating...');
      try {
        const response=await apiConnector(UPDATEDPAPI,"PUT",formData,{
          'Content-Type': 'multipart/form-data',
          Authorization:`bearer ${token}`
        })
        if(response.data.success){
          dispatch(setDP(response.data.url));
          const user=JSON.parse(localStorage.getItem("user"));
          const updatedUser={...user,image:response.data.url};
          // console.log(updatedUser);
          const updatedUserJson=JSON.stringify(updatedUser);
          // console.log(updatedUserJson);
          localStorage.setItem("user",updatedUserJson);
          toast.success("Profile picture updated");
        }
      } catch (error) {
        toast.error("faild to update profile picture");
          console.log("error while update dp operation",error.message);
      }
      toast.dismiss(tId);
    }
}

