import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { profileEndpoint } from "../apis";
import { setLoading, setUser } from "../../slices/profileSlice";
import { setToken } from "../../slices/authSlice";
import { resetCart } from "../../slices/cartSlice";
const { GETUSERDETAILS, UPDATEPROFILE, DELETEPROFILE } = profileEndpoint;
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
