export const baseUrl = process.env.REACT_APP_BASE_URL;

export const courses = {
  totalCourses: `${baseUrl}/course/allCategory`,
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
}