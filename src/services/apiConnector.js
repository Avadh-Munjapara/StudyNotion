import axios from "axios";
import { courses } from "./apis";
const apiConnector = async (url, method, data = null, headers = null, params = null) => {
  try {
    const response = await axios({ url, method, data, headers, params,
     });
    return response;
  } catch (error) {
    console.error("API request failed:", error);
  }
};

export default apiConnector;

