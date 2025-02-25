import React, { useEffect, useState, useRef, useCallback } from "react";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]); // Displayed posts
  const [page, setPage] = useState(1);
  const observer = useRef(null);

  // Sample data (Replace this with API data)
  const samplePosts = Array.from({ length: 100 }, (_, index) => ({
    title: `Post ${index + 1}`,
    description:
      "WHO global framework to define and guide studies into the origins of emerging and re-emerging pathogens with epidemic and pandemic potential",
    postedBy: "Ganesh",
    createdDate: "2024-12-09",
  }));

  useEffect(() => {
    setPosts(samplePosts);
    setVisiblePosts(samplePosts.slice(0, 20)); // Load first 20 posts
  }, []);

  const loadMorePosts = () => {
    const nextPosts = posts.slice(page * 20, (page + 1) * 20);
    if (nextPosts.length) {
      setVisiblePosts((prev) => [...prev, ...nextPosts]);
      setPage((prev) => prev + 1);
    }
  };

  const lastPostRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
        }
      });
      if (node) observer.current.observe(node);
    },
    [page, posts]
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visiblePosts.map((post, index) => (
          <div
            key={index}
            ref={index === visiblePosts.length - 1 ? lastPostRef : null}
            className="bg-white shadow-lg p-4 rounded-lg border border-gray-200"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{post.description}</p>
            <div className="flex justify-between text-xs text-gray-500 mt-3">
              <span>By: {post.postedBy}</span>
              <span>{post.createdDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
