import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import { auth } from "../apis";
import { resetCart } from "../../slices/cartSlice";
import {
  deleteCourseInfo,
  setCourseInfo,
  setEditCourse,
  setStep,
} from "../../slices/courseSlice";
import { setUser } from "../../slices/profileSlice";
const {
  SENDOTPAPI,
  SIGNUPAPI,
  LOGINAPI,
  FORGOTPASSWORDAPI,
  PASSWORDTOKENAPI,
  CHANGEPASSWORDAPI,
} = auth;
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
export function sendOTP(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(SENDOTPAPI, "POST", { email });
      if (response.data.success) {
        toast.success("otp sent");
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error("failed to send otp");
    }
    dispatch(setLoading(false));
  };
}

export function signup(data, navigate) {
  return async (dispatch) => {
    setLoading(true);
    try {
      const response = await apiConnector(SIGNUPAPI, "POST", data);
      if (response.data.success) {
        toast.success("signed up ");
        navigate("/login");
      }
    } catch (error) {
      // console.log("error in signup operation",error);
      toast.error("failed to signup");
      navigate("/signup");
    }
    setLoading(false);
  };
}

export function login(email, password, navigate) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("loading...");
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(LOGINAPI, "POST", {
        email,
        password,
      });
      if (response.data.success) {
        const user = response.data.user;
        const image = user.image.split(" ").join("?");
        // console.log(image);
        const userData = {
          ...user,
          image,
        };
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(setUser(userData));
        dispatch(setToken(response.data.token));
        toast.success("login successfull");
        if (user.accountType === "Student")
          navigate("/dashboard/enrolled-courses");
        else if(user.accountType==='Instructor') navigate("/dashboard/my-courses");
        else if (user.accountType === "Admin") navigate("/dashboard/admin");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      // console.log("error in login operation",error);
      toast.error("failed to login");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    dispatch(deleteCourseInfo());
    dispatch(setCourseInfo(null));
    dispatch(setEditCourse(false));
    dispatch(setStep(1));
    toast.success("logged out");
    navigate("/");
  };
}

export function sendResetPasswordToken(payLoad, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(PASSWORDTOKENAPI, "POST", payLoad);
      if (response.data.success) {
        toast.success("mail sent successfully");
        setEmailSent(true);
      }
    } catch (error) {
      console.log("error in operation resetpasswordtoken", error);
    }
    dispatch(setLoading(false));
  };
}

export function setForgotPassword(payload, setPassChanged) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector(FORGOTPASSWORDAPI, "POST", payload);
      if (response.data.success) {
        toast.success("password updated successfully");
        setPassChanged(true);
      }
    } catch (error) {
      console.log("error in forgotPassword operation", error);
    }
    dispatch(setLoading(false));
  };
}

export function changePassword(payload) {
  return async (dispatch) => {
    const tId = toast.loading("loading");
    try {
      const response = await apiConnector(CHANGEPASSWORDAPI, "PUT", payload, {
        Authorization: `bearer ${token}`,
      });
      if (response.data.success) {
        toast.dismiss(tId);
        toast.success("password changed");
      }
    } catch (error) {
      console.log("error while changing password operaion", error.message);
      toast.error("faild to change password");
      toast.dismiss(tId);
    }
  };
}
