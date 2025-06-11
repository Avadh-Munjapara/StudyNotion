import toast from "react-hot-toast";
import apiConnector from "../apiConnector";
import { adminEndpoint } from "../apis";

const {
  CREATE_CATEGORY_API,
  GET_CATEGORYWISE_STUDENTS_API,
  GET_MOST_SELLING_COURSES_API,
  GET_STATS_API,
  GET_TOP_INSTRUCTORS_API,
} = adminEndpoint;

const makeAuthenticatedRequest = async (url, method, data = null, token) => {
  try {
    const response = await apiConnector(url, method, data, {
      Authorization: `bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error) {
    console.error(`API request failed for ${method} ${url}:`, error);
    return null; 
  }
};


export const createCategory = async (token, name, description) => {
  const result = await makeAuthenticatedRequest(CREATE_CATEGORY_API, "POST", { name, description }, token);
  if (result) {
    toast.success("Category created successfully");
    return result;
  }
  toast.error("Failed to create category");
  return null;
};

export const getStats = async (token) => {
  return await makeAuthenticatedRequest(GET_STATS_API, "GET", null, token);
};

export const getTopInstructors = async (token) => {
  return await makeAuthenticatedRequest(GET_TOP_INSTRUCTORS_API, "GET", null, token);
};

export const getMostSellingCourses = async (token) => {
  return await makeAuthenticatedRequest(GET_MOST_SELLING_COURSES_API, "GET", null, token);
};

export const getCategorywiseStudents = async (token) => {
  return await makeAuthenticatedRequest(GET_CATEGORYWISE_STUDENTS_API, "GET", null, token);
};

export const getAdminDashboardDetails = async (token, setLoading) => {
  setLoading(true);
  try {
    const results = await Promise.allSettled([
      getStats(token),
      getTopInstructors(token),
      getMostSellingCourses(token),
      getCategorywiseStudents(token),
    ]);
    const [statsResult, instructorsResult, coursesResult, categoriesResult] = results;

    const dashboardData = {
      stats: statsResult.status === 'fulfilled' ? statsResult.value.stats : null,
      topInstructors: instructorsResult.status === 'fulfilled' ? instructorsResult.value.topInstructors : null,
      mostSellingCourses: coursesResult.status === 'fulfilled' ? coursesResult.value.mostSellingCourses : null,
      categoryWiseCourses: categoriesResult.status === 'fulfilled' ? categoriesResult.value.categoryWiseCourses : null,
    };
    
    if (results.some(result => result.status === 'rejected')) {
        toast.error("Could not fetch all dashboard data. Some charts may be unavailable.");
    }

    return dashboardData;

  } catch (error) {
    console.error("An unexpected error occurred while fetching dashboard details:", error);
    toast.error("A critical error occurred. Failed to load dashboard data.");
    return { stats: null, instructors: null, courses: null, categories: null };
  } finally {
    setLoading(false);
  }
};