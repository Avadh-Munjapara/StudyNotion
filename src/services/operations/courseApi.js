import { setLoading } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import { courseEndPoint } from "../apis";
import {
  setStep,
  setCourseInfo,
  setEditCourse,
} from "../../slices/courseSlice";
import toast from "react-hot-toast";

const {
  GET_AVG_RATING,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
} = courseEndPoint;
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;
export async function getAverageRating(payLoad) {
  dispatchEvent(setLoading(true));
  try {
    const response = await apiConnector(GET_AVG_RATING, "GET", payLoad, {
      Authorization: `bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.log("error in getAverageRating api", error);
  }
}

export function createCourse(payLoad, course, setLoading) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const createdCourse = await apiConnector(
        CREATE_COURSE_API,
        "POST",
        payLoad,
        {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        }
      );
      if (createdCourse.data.success) {
        const newCreatedCourse = {...course,courseId: createdCourse.data.course._id};
        dispatch(setCourseInfo(newCreatedCourse));
        dispatch(setStep(2));
        dispatch(setEditCourse(true));
        toast.success("course created successfully!");
      }
    } catch (error) {
      console.log("error in createCourse api", error);
      toast.error("course not created!");
    }
    dispatch(setLoading(false));
  };
}

export function editCourseDetails(payLoad, course) {
    return async (dispatch) => {
        const tid = toast.loading("Editing course...");
        try {
        const editedCourse = await apiConnector(
            EDIT_COURSE_API,
            "PUT",
            payLoad,
            {
            Authorization: `bearer ${token}`,
            }
        );
        if (editedCourse.data.success) {
            dispatch(setCourseInfo({...course,thumbnail:editedCourse.data.updatedCourse.thumbnail}));
            dispatch(setStep(2));
            toast.success("course edited successfully!");
        }
        } catch (error) {
        console.log("error in editCourse api", error);
        toast.error("course not edited!");
        }
        toast.dismiss(tid);
    };
}

export function createSection(payLoad) {
  return async (dispatch) => {
    const tid = toast.loading("Creating section...");
    try {
      const createdSection = await apiConnector(
        courseEndPoint.CREATE_SECTION_API,
        "POST",
        payLoad,
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (createdSection.data.success) {
        dispatch(setCourseInfo(createdSection.data.updatedCourse));
        toast.success("section created successfully!");
      }
    } catch (error) {
      console.log("error in createSection api", error);
      toast.error("section not created!");
    }
    toast.dismiss(tid);
  };
}
