// Server Component - renders all posts on the server
import React from "react";
import Link from "next/link";

// Server-side data fetching function
async function getAllPosts() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?all=true`, { 
      cache: "no-store", // Always fetch fresh data
      next: { revalidate: 0 }
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return [];
  }
}

const Posts = async () => {
  const posts = await getAllPosts();

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
              <p className="text-gray-600">{post.desc?.slice(0, 100)}...</p>
              <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600">No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
