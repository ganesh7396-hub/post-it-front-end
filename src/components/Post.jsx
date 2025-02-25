import React, { useEffect, useState, useRef } from "react";
import { FiEdit, FiTrash2, FiThumbsUp, FiMessageSquare } from "react-icons/fi";
import postService from "../services/post.service";
import PropTypes from "prop-types";

const Post = ({user}) => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const observer = useRef(null);

  const fetchPosts = async () => {
    try {
      const response = await postService.getAllPosts();
      const sortedPosts = response.data.reverse(); // Latest at the top
      setPosts(sortedPosts);
      setVisiblePosts(sortedPosts.slice(0, 20));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async () => {
    if (!title.trim() || !description.trim()) return;
    setIsAdding(true);

    try {
      await postService.createPost({ title, description });
      setTitle("");
      setDescription("");
      fetchPosts(); // Reload API after adding a post
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditPost = (post) => {
    setEditId(post._id);
    setTitle(post.title);
    setDescription(post.description);
  };

  const handleSaveEdit = async () => {
    if (!title.trim() || !description.trim() || !editId) return;
    try {
      await postService.editPost(editId, { title, description });
      setEditId(null);
      setTitle("");
      setDescription("");
      fetchPosts(); // Reload API after editing
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost(postId);
      fetchPosts(); // Reload API after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle Like Increment
  const handleLike = async (postId) => {
    try {
      await postService.likePost(postId); // Backend API to increment likes
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Posts</h1>

      {/* Post Creation Form */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-3">{editId ? "Edit Post" : "Create a Post"}</h2>
        <input
          type="text"
          placeholder="Enter title..."
          className="w-full p-2 border rounded-md mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Enter description..."
          className="w-full p-2 border rounded-md mb-2"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={editId ? handleSaveEdit : handleAddPost}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
        >
          {editId ? "Save Changes" : "Add Post"}
        </button>
      </div>

      {/* Loading State for Adding Post */}
      {isAdding && (
        <div className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 animate-pulse">
          <h2 className="text-2xl font-semibold text-gray-400">Adding Post...</h2>
          <p className="text-sm text-gray-400">Please wait</p>
        </div>
      )}

      {/* Post List */}
      <div className="flex flex-col gap-6">
        {visiblePosts.map((post) => (
          <div key={post._id} className="bg-white shadow-lg p-6 rounded-lg border border-gray-300 hover:shadow-xl transition duration-300 relative">
            {/* Post Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
           
           {user._id === post.postedBy?._id && <div className="flex space-x-2">
                <button onClick={() => handleEditPost(post)}>
                  <FiEdit className="text-yellow-500 hover:text-yellow-600 transition text-xl" />
                </button>
                <button onClick={() => handleDeletePost(post._id)}>
                  <FiTrash2 className="text-red-500 hover:text-red-600 transition text-xl" />
                </button>
              </div>}
             
            </div>

            {/* Post Description */}
            <p className="text-sm text-gray-600 mt-2">{post.description}</p>

            {/* PostedBy User */}
            <p className="text-sm text-gray-500 mt-2">
              <strong>Posted by:</strong> {post.postedBy?.userName || "Unknown"}
            </p>

            {/* Like & Comment Icons */}
            <div className="flex justify-between items-center mt-4 text-gray-600">
              <div className="flex space-x-4">
                {/* Like Button */}
                <button onClick={() => handleLike(post._id)} className="flex items-center space-x-1">
                  <FiThumbsUp className="text-blue-500 cursor-pointer" />
                  <span>{post.likes || 0}</span>
                </button>

                {/* Comment Count */}
                <span className="flex items-center space-x-1">
                  <FiMessageSquare className="text-green-500" />
                  <span>{post.comments || 0}</span>
                </span>
              </div>
              <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Post.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string, // Validate user.fullName
    _id: PropTypes.string, // Validate user.fullName
  }),
}
export default Post;
