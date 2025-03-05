export const baseUrl = process.env.REACT_APP_BASE_URL;

export const courses = {
  totalCourses: `${baseUrl}/course/allCategory`,
};

export const auth={
  login:`${baseUrl}/auth/login`,
  SENDOTPAPI:`${baseUrl}/auth/sendotp`,
  SIGNUPAPI:`${baseUrl}/auth/signup`,
  LOGINAPI:`${baseUrl}/auth/login`
};

