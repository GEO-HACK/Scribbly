"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/posts?userEmail=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => setPosts(data))
        .catch((err) => console.error("Error fetching posts", err));
    }
  }, [session]);
  if (!session) {
    return (
      <p className="text-center text-red-500">
        Please log in to view your profile
      </p>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* profile header */}
      <div className="flex items-center gap-2 p-4 bg-white shadow-md rounded-lg">
        <Image
          src={session.user.image}
          alt="profile image"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h2 className="text-xl font-semibold">{session.user.name}</h2>
          <p className="text-lg text-green-600 ">{session.user.email}</p>
        </div>
      </div>
      {/* user post section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4"> Your posts</h3>
        {posts.length > 0 ? (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div key={post.id} className="p-4 bg-white shadow-md rounded-lg">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 font-semibold"
                >
                  {post.title}
                </Link>
                <p className="text-gray-600 text-sm">
                  {post.desc.substring(0, 100)}...
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>you haven't created any posts</p>
        )}
      </div>
    </div>
  );
};

export default page;
