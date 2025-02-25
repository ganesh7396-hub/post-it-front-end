import httpService from "../httpService/httpService";

const POST_API = "posts"; // Base post endpoint

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const postService = {
  // Fetch All Posts
  getAllPosts: async () => {
    return await httpService.get(`${POST_API}/all`, {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    });
  },

  // Fetch User's Own Posts
  getSelfPosts: async () => {
    return await httpService.get(`${POST_API}/self`, {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    });
  },

  // Create a New Post
  createPost: async (postData) => {
    return await httpService.post(`${POST_API}/add`, postData, {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    });
  },

  // Edit a Post
  editPost: async (postId, postData) => {
    return await httpService.put(`${POST_API}/edit/${postId}`, postData, {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    });
  },

  // Delete a Post
  deletePost: async (postId) => {
    return await httpService.delete(`${POST_API}/delete/${postId}`, {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    });
  },
};

export default postService;
