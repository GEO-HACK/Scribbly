import CardList from '@/components/cardList/CardList';
import Menu from '@/components/menu/Menu';
import React from 'react';

// Fetch initial data on the server
const fetchInitialPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?page=1`, {
      cache: "force-cache", // Enable caching for static generation
    });

    if (!res.ok) throw new Error("Failed to fetch initial posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching initial posts:", error);
    return [];
  }
};

const BlogPage = async () => {
  const initialPosts = await fetchInitialPosts(); // Fetch at build time

  return (
    <div>
      <h1 className='w-full bg-orange-400 py-[5px] px-[10px] flex justify-center text-lg font-semibold'>
        Blogs
      </h1>

      <div className='flex gap-[50px] mt-6'>
        <CardList initialData={initialPosts} />
        <Menu />
      </div>
    </div>
  );
}

export default BlogPage;
