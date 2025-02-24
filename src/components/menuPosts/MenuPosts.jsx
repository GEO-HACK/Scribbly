"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const MenuPosts = ({ withImage }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts"); // Fetching posts from existing API
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();

        // Sort posts by the number of comments in descending order
        // const sortedPosts = data.sort((a, b) => b.comments.length - a.comments.length);

        // Limit to top 10 most commented posts
        setPosts(data.slice(0, 10));
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col gap-3 mt-5 mb-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <div className={`flex ${withImage ? "gap-3 items-center" : "flex-col"} w-full`}>
              {withImage && (
                <div className="max-w-[30%] relative w-10 h-10 border rounded-full border-gray-400">
                  <img src={post.img || "/default-image.jpg"} alt="post image" className="rounded-full w-full h-full object-cover" />
                </div>
              )}
              <div className={`${withImage ? "max-w-[70%]" : "w-full"}`}>
                <span className="bg-blue-200 rounded-xl px-4 text-[10px] py-1">
                  {post.catSlug|| "Uncategorized"}
                </span>
                <h3 className="text-[12px] font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-500">{post.desc.slice(0,50)}...</p>
                <div className="text-sm">
                  <span className="text-[12px]">{post.user?.name || "Unknown"} - </span>
                  <span className="font-light text-[10px] text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No trending posts available.</p>
      )}
    </div>
  );
};

export default MenuPosts;