"use client";

import React, { useEffect, useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch(`/api/posts`, { cache: "no-cache" });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setPosts(json);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        setPosts([]);
      }
    };

    fetchAllPosts();
  }, []);

  return (
    <div className="max-w-[70%]">
      <h1 className="font-semibold text-xl mt-4 mb-4">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{post.title}</h2>
              <p className="text-gray-600">{post.summary}</p>
              <a href={`/post/${post.id}`} className="text-blue-500">
                Read more
              </a>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
