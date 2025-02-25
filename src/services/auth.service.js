import httpService from "../httpService/httpService";
const AUTH_API = "auth"; // Base auth endpoint

const authService = {
  // User Registration
  register: async (userData) => {
    return await httpService.post(`${AUTH_API}/register`, userData);
  },

  // User Login
  login: async (credentials) => {
    const response = await httpService.post(`${AUTH_API}/login`, credentials);

    if (response.token) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.data)); 
    }

    return response;
  },

  // Logout (Remove token)
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },


  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
