export const baseUrl = process.env.REACT_APP_BASE_URL;

export const courses = {
  totalCourses: `${baseUrl}/api/v1/course/allCategory`,
};

export const auth={
  login:`${baseUrl}/api/v1/auth/login`,
  SENDOTPAPI:`${baseUrl}/api/v1/auth/sendotp`,
  SIGNUPAPI:`${baseUrl}/api/v1/auth/signup`,
};

