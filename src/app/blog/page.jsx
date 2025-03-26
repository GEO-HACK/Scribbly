export const dynamic = 'force-dynamic'

import { Suspense } from "react";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

const fetchInitialPosts = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts?page=1`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error("Failed to fetch initial posts");
    return await res.json();
  } catch (error) {
    console.error("Error fetching initial posts:", error);
    return [];
  }
};

const BlogPage = async () => {
  const initialPosts = await fetchInitialPosts();

  return (
    <div>
      <h1 className="w-full bg-orange-400 py-[5px] px-[10px] flex justify-center text-lg font-semibold">
        Blogs
      </h1>

      <div className="flex gap-[50px] mt-6">
        <Suspense fallback={<div>Loading posts...</div>}>
          <CardList initialData={initialPosts} />
        </Suspense>
        <Suspense fallback={<div>Loading menu...</div>}>
          <Menu />
        </Suspense>
      </div>
    </div>
  );
};

export default BlogPage;
