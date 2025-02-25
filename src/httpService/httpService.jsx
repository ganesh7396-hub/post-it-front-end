import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const handleError = (error) => {
  let errorMessage = "An unexpected error occurred!";

  if (error.response) {
    errorMessage =
      error.response.data?.message ||
      `Error ${error.response.status}: ${error.response.statusText}`;
  } else if (error.request) {
    errorMessage = "No response from server. Please check your network.";
  } else {
    errorMessage = error.message;
  }

  throw new Error(errorMessage);
};


const httpService = {
  get: (endpoint, headers = {}) =>
    axios
      .get(`${API_BASE_URL}/${endpoint}`, { headers })
      .then((res) => res.data)
      .catch(handleError),

  post: (endpoint, data, headers = {}) =>
    axios
      .post(`${API_BASE_URL}/${endpoint}`, data, { headers }) 
      .then((res) => res.data)
      .catch(handleError),

  put: (endpoint, data, headers = {}) =>
    axios
      .put(`${API_BASE_URL}/${endpoint}`, data, { headers }) 
      .then((res) => res.data)
      .catch(handleError),

  delete: (endpoint, headers = {}) =>
    axios
      .delete(`${API_BASE_URL}/${endpoint}`, { headers }) 
      .then((res) => res.data)
      .catch(handleError),
};

export default httpService;
