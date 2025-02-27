import axios from "axios";
import { courses } from "./apis";
const apiConnector = async (url, method, data = null, headers = null, params = null) => {
  try {
    const response = await axios({ url, method, data, headers, params });
    return response;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

export default apiConnector;

// Example usage with courses
console.log("Base URL:", process.env.REACT_APP_BASE_URL); // Should log "http://localhost:3000"
console.log("Total Courses URL:", courses.totalCourses); // Should log "http://localhost:3000/allCategory"

apiConnector(courses.totalCourses, "GET")
  .then((response) => console.log(response.data))
  .catch((error) => console.error(error));