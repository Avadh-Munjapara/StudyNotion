export const baseUrl = process.env.REACT_APP_BASE_URL;

export const categoryEndpoint = {
  GET_ALL_CATEGORY_API: `${baseUrl}/course/allCategory`,
};

export const auth={
  login:`${baseUrl}/auth/login`, 
  SENDOTPAPI:`${baseUrl}/auth/sendotp`,
  SIGNUPAPI:`${baseUrl}/auth/signup`,
  LOGINAPI:`${baseUrl}/auth/login`,
  PASSWORDTOKENAPI:`${baseUrl}/auth/resetPasswordToken`,
  FORGOTPASSWORDAPI:`${baseUrl}/auth/resetPassword`,
  CHANGEPASSWORDAPI:`${baseUrl}/auth/changePassword`
}; 

export const contactEndpoint={
    SENDMESSAGEAPI:`${baseUrl}/auth/contactUs`,
}

export const profileEndpoint={
  GETUSERDETAILS:`${baseUrl}/profile/getUserDetails`,
  UPDATEPROFILE:`${baseUrl}/profile/updateProfile`,
  DELETEPROFILE:`${baseUrl}/profile/deleteAccount`,
  UPDATEDPAPI:`${baseUrl}/profile/updateDP`,
  GET_ENROLLED_COURSES_API:`${baseUrl}/profile/getEnrolledCourses`,
  GET_INSTRUCTOR_COURSES_API:`${baseUrl}/profile/getInstructorCourses`,
}

export const courseEndPoint={
  GET_AVG_RATING:`${baseUrl}/course/getAverageRating`,
  CREATE_COURSE_API:`${baseUrl}/course/createCourse`,
  EDIT_COURSE_API:`${baseUrl}/course/editCourse`,
  CREATE_SECTION_API:`${baseUrl}/course/createSection`,
  UPDATE_SECTION_API:`${baseUrl}/course/updateSection`,
  DELETE_SECTION_API:`${baseUrl}/course/deleteSection`,
  CREATE_SUBSECTION_API:`${baseUrl}/course/createSubSection`,
  EDIT_SUBSECTION_API:`${baseUrl}/course/updateSubSection`,
  DELETE_SUBSECTION_API:`${baseUrl}/course/deleteSubSection`,
  GET_FULL_COURSE_DETAILS_API:`${baseUrl}/course/courseDetails`,
  DELETE_COURSE_API:`${baseUrl}/course/deleteCourse`,
  GET_CATEGORY_COURSES_API:`${baseUrl}/course/categoryCourses`,
}