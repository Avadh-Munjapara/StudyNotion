console.log("Node env:", process.env);
console.log("Direct env check:", process.env.REACT_APP_BASE_URL);
console.log("Test var:", process.env.REACT_APP_TEST_VAR);

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const courses = {
  totalCourses: `${baseUrl}/api/v1/course/allCategory`,
};

console.log("Base URL:", baseUrl);
console.log("Total Courses URL:", courses.totalCourses);