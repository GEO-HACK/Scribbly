// Server Component - renders popular posts on the server
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Server-side data fetching function
async function getPopularPosts() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts?all=true`, {
      cache: "force-cache", // Cache popular posts for better performance
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) throw new Error("Failed to fetch posts");
    const data = await res.json();

    // Sort posts by the number of comments in descending order and limit to 4
    return data
      .sort((a, b) => (b._count?.comments || 0) - (a._count?.comments || 0))
      .slice(0, 4);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

const MenuPosts = async ({ withImage }) => {
  const posts = await getPopularPosts();

  return (
    <div className="flex flex-col gap-3 mt-5 mb-4">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link href={`/posts/${post.slug}`} key={post.id}>
            <div className={`flex ${withImage ? "gap-3 items-center" : "flex-col"} w-full hover:opacity-80 transition-opacity`}>
              {withImage && (
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image 
                    src={post.img || "/placeholder.jpg"} 
                    alt="Post thumbnail" 
                    fill
                    className="rounded-full object-cover border border-gray-400"
                  />
                </div>
              )}
              <div className={`${withImage ? "flex-1" : "w-full"}`}>
                <span className="bg-blue-200 rounded-xl px-2 text-[10px] py-1 inline-block mb-1">
                  {post.catSlug || "Uncategorized"}
                </span>
                <h3 className="text-[12px] font-semibold line-clamp-2">{post.title}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-2">
                  {post.desc?.slice(0, 50)}...
                </p>
                <div className="text-[10px] mt-1">
                  <span>{post.user?.name || "Unknown"} - </span>
                  <span className="font-light text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No trending posts available.</p>
      )}
    </div>
  );
};

export default MenuPosts;