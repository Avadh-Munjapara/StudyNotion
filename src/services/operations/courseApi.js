import { setLoading } from "../../slices/authSlice";
import apiConnector from "../apiConnector";
import { courseEndPoint } from "../apis";
import {
  setStep,
  setCourseInfo,
  setEditCourse,
  setLoading as setLoadingCourse,
} from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { set } from "react-hook-form";
import { setCompletedLectures } from "../../slices/viewCourse";
const {
  GET_AVG_RATING,
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  EDIT_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  GET_FULL_COURSE_DETAILS_API,
  DELETE_COURSE_API,
  GET_CATEGORY_COURSES_API,
  MARK_AS_COMPLETED_API,
  GET_FULL_ENROLLED_COURSE_DETAILS_API,
  CREATE_RATING_API,
  GET_COURSE_REVIEW_API,
  GET_ALL_REVIEWS_API,
  GET_AVERAGE_RATING_API,
} = courseEndPoint;

export async function getAverageRating(token, payLoad) {
  try {
    const response = await apiConnector(
      GET_AVERAGE_RATING_API,
      "POST",
      payLoad,
      {
        Authorization: `bearer ${token}`,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.log("error in getAverageRating api", error);
  }
}

export function createCourse(token, payLoad, course, setLoading) {
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
        const newCreatedCourse = { ...createdCourse.data.course };
        dispatch(setCourseInfo(newCreatedCourse));
        dispatch(setStep(2));
        dispatch(setEditCourse(true));
        toast.success("course created!");
      }
    } catch (error) {
      console.log("error in createCourse api", error);
      toast.error("course not created!");
    }
    dispatch(setLoading(false));
  };
}

export function editCourseDetails(token, payLoad, course, step) {
  return async (dispatch) => {
    const tid = toast.loading("Editing course...");
    try {
      const editedCourse = await apiConnector(EDIT_COURSE_API, "PUT", payLoad, {
        Authorization: `bearer ${token}`,
      });
      if (editedCourse.data.success) {
        dispatch(
          setCourseInfo({
            ...course,
            thumbnail: editedCourse.data.updatedCourse.thumbnail,
            status: editedCourse.data.updatedCourse.status,
          })
        );
        dispatch(setStep(step));
        toast.success("course edited!");
      }
    } catch (error) {
      console.log("error in editCourse api", error);
      toast.error("course not edited!");
    }
    toast.dismiss(tid);
  };
}

export function createSection(token, payLoad, courseInfo) {
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
        const newCourseInfo = {
          ...courseInfo,
          courseContent: courseInfo?.courseContent?.map((content, i) => ({
            ...content,
            subSections: content?.subSections?.map((subSection, j) => ({
              ...subSection,
            })),
          })),
        };
        newCourseInfo.courseContent.push(createdSection.data.section);
        dispatch(setCourseInfo(newCourseInfo));
        toast.success("section created!");
      }
    } catch (error) {
      console.log("error in createSection api", error);
      toast.error("section not created!");
    }
    toast.dismiss(tid);
  };
}

export function updateSectionName(
  token,
  payload,
  courseInfo,
  index,
  setEditSection
) {
  return async (dispatch) => {
    const tid = toast.loading("updating section name");
    try {
      const response = await apiConnector(
        courseEndPoint.UPDATE_SECTION_API,
        "PUT",
        payload,
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (response.data.success) {
        toast.success("section name updated!");
        console.log(response, "updated seection");
        const updatedCourseInfo = {
          ...courseInfo,
          courseContent: courseInfo.courseContent.map((content, i) => ({
            ...content,
            subSections: content.subSections.map((subSection, j) => ({
              ...subSection,
            })),
          })),
        };
        updatedCourseInfo.courseContent[index].name =
          response.data.updatedSection.name;
        dispatch(setCourseInfo(updatedCourseInfo));
        setEditSection(false);
      }
    } catch (error) {
      console.log("error in update section api", error);
    }
    toast.dismiss(tid);
  };
}

export function deleteSection(token, payload, courseInfo, index) {
  return async (dispatch) => {
    dispatch(setLoadingCourse(true));
    const tid = toast.loading("deleting section");
    try {
      const response = await apiConnector(
        DELETE_SECTION_API,
        "DELETE",
        payload,
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (response.data.success) {
        toast.success("section deleted!");
        const newCourseInfo = {
          ...courseInfo,
          courseContent: courseInfo.courseContent.map((content, i) => ({
            ...content,
            subSections: content.subSections.map((subSection, j) => ({
              ...subSection,
            })),
          })),
        };
        newCourseInfo.courseContent.splice(index, 1);
        dispatch(setCourseInfo(newCourseInfo));
      }
    } catch (error) {
      console.log("api error in deleteSection", error);
    }
    toast.dismiss(tid);
    dispatch(setLoadingCourse(false));
  };
}

export function createSubsection(
  token,
  payload,
  courseInfo,
  index,
  removeForm
) {
  return async (dispatch) => {
    dispatch(setLoadingCourse(true));
    const tid = toast.loading("Creating subsection...");
    try {
      const createdSubSection = await apiConnector(
        CREATE_SUBSECTION_API,
        "POST",
        payload,
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (createdSubSection.data.success) {
        const newSubSection = createdSubSection.data.subSection;
        const updatedCourseInfo = {
          ...courseInfo,
          courseContent: courseInfo.courseContent.map((content, i) =>
            i === index
              ? {
                  ...content,
                  subSections: [...content.subSections, newSubSection],
                }
              : { ...content, subSections: [...content.subSections] }
          ),
        };
        dispatch(setCourseInfo(updatedCourseInfo));
        toast.success("subsection created!");
        removeForm();
      }
    } catch (error) {
      console.log("error in createSubSection api", error);
      toast.error("subsection not created!");
    }
    toast.dismiss(tid);
    dispatch(setLoadingCourse(false));
  };
}

export function editSubSection(token, payload, courseInfo, index, removeForm) {
  return async (dispatch) => {
    dispatch(setLoadingCourse(true));
    const tid = toast.loading("Editing subsection...");
    try {
      const response = await apiConnector(EDIT_SUBSECTION_API, "PUT", payload, {
        Authorization: `bearer ${token}`,
      });
      if (response.data.success) {
        const newSubSection = response.data.updatedSubSection;
        const updatedCourseInfo = {
          ...courseInfo,
          courseContent: courseInfo.courseContent.map((content, i) =>
            i === index
              ? {
                  ...content,
                  subSections: content.subSections.map((subSection, j) =>
                    subSection._id === newSubSection._id
                      ? newSubSection
                      : { ...subSection }
                  ),
                }
              : { ...content }
          ),
        };
        console.log(updatedCourseInfo, "updated subsection");
        dispatch(setCourseInfo(updatedCourseInfo));
        toast.success("subsection edited!");
        removeForm();
      }
    } catch (error) {
      console.log("error in editSubSection api", error);
      toast.error("subsection not edited!");
    }
    toast.dismiss(tid);
    dispatch(setLoadingCourse(false));
  };
}

export function deleteSubSection(
  token,
  payload,
  courseInfo,
  index,
  removeForm
) {
  return async (dispatch) => {
    dispatch(setLoadingCourse(true));
    const tid = toast.loading("Deleting subsection...");
    try {
      const response = await apiConnector(
        DELETE_SUBSECTION_API,
        "DELETE",
        payload,
        {
          Authorization: `bearer ${token}`,
        }
      );
      if (response.data.success) {
        const upadatedSection = response.data.updatedSection;
        const updatedCourseInfo = {
          ...courseInfo,
          courseContent: [...courseInfo.courseContent],
        };
        updatedCourseInfo.courseContent[index] = upadatedSection;
        dispatch(setCourseInfo(updatedCourseInfo));
        toast.success("subsection deleted!");
        removeForm();
      }
    } catch (error) {
      console.log("error in deleteSubSection api", error);
      toast.error("subsection not deleted!");
    }
    toast.dismiss(tid);
    dispatch(setLoadingCourse(false));
  };
}

export async function getFullCourseDetails(payload, dispatch) {
  try {
    dispatch(setLoadingCourse(true));
    const response = await apiConnector(
      `${GET_FULL_COURSE_DETAILS_API}/${payload.courseId}`,
      "GET"
    );
    if (response.data.success) {
      return response.data.course;
    }
  } catch (error) {
    console.log("error while fetching full course ....api error", error);
  } finally {
    dispatch(setLoadingCourse(false));
  }
}

export async function getFullEnrolledCourseDetails(token, courseId, dispatch) {
  try {
    dispatch(setLoadingCourse(true));
    const response = await apiConnector(
      GET_FULL_ENROLLED_COURSE_DETAILS_API,
      "POST",
      {
        courseId,
      },
      {
        Authorization: `bearer ${token}`,
      }
    );
    if (response.data.success) {
      return response.data.course;
    }
  } catch (error) {
    console.log("error while fetching full course ....api error", error);
  } finally {
    dispatch(setLoadingCourse(false));
  }
}

export async function deleteCourse(token, payload, dispatch) {
  dispatch(setLoadingCourse(true));
  const tid = toast.loading("deleting Course...");
  try {
    const response = await apiConnector(DELETE_COURSE_API, "DELETE", payload, {
      Authorization: `bearer ${token}`,
    });
    console.log(response);
    if (response.data.success) {
      toast.success("Course Deleted!");
      toast.dismiss(tid);
      dispatch(setLoadingCourse(false));
      return true;
    }else{
      toast.error("can't delete course having students enrolled in it!"); 
    }
  } catch (error) {
    console.log("error in deleteCourse api", error);
    toast.error("course not deleted");
    return false;
  } finally {
    toast.dismiss(tid);
    dispatch(setLoadingCourse(false));
  }
}

export async function getCategoryCourses(payload, setCourses) {
  try {
    const response = await apiConnector(
      `${GET_CATEGORY_COURSES_API}/${payload.categoryId}`,
      "GET"
    );
    if (response.data.success) {
      const courses = response.data;
      setCourses(courses);
    }
    console.log(response, "category page details");
  } catch (error) {
    console.log(error);
  }
}

export async function markAsComplete(
  token,
  courseId,
  subSectionId,
  dispatch,
  setLoading,
  completedLecturess
) {
  setLoading(true);
  try {
    var response = await apiConnector(
      MARK_AS_COMPLETED_API,
      "PUT",
      {
        courseId,
        subSectionId,
      },
      { Authorization: `bearer ${token}` }
    );
    if (response?.data?.success) {
      const newCompletedLectures = [...completedLecturess, subSectionId];
      dispatch(setCompletedLectures(newCompletedLectures));
    }
    console.log(response);
  } catch (error) {
    console.log("error in mark complete api", error);
  }
  setLoading(false);
  return response.data;
}

export async function addRating(
  token,
  rating,
  review,
  courseId,
  setLoading,
  disappearHandler
) {
  try {
    setLoading(true);
    var tId = toast.loading("Adding Review");
    const response = await apiConnector(
      CREATE_RATING_API,
      "POST",
      {
        courseId,
        rating,
        review,
      },
      {
        Authorization: `bearer ${token}`,
      }
    );
    console.log(response);
    if (response?.data.success) toast.success("review added");
    setLoading(false);
    disappearHandler(true);
  } catch (error) {
    console.log("error while create rating api", error);
  }
  toast.dismiss(tId);
}

export async function getCourseReviews(courseId) {
  try {
    const response = await apiConnector(GET_COURSE_REVIEW_API, "POST", {
      courseId,
    });
    if (response?.data?.success) return response.data.data;
  } catch (error) {}
}

export async function getAllReviews() {
  try {
    const response = await apiConnector(GET_ALL_REVIEWS_API, "GET");
    if (response?.data?.success) return response.data.data;
  } catch (error) {}
}
