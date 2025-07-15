// Server Component - renders on the server
import React from "react";
import Image from "next/image";
import Link from "next/link";

// Server-side data fetching function
async function getCategories() {
  try {
    // Return empty array during build to prevent API calls
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
}

const CategoryList = async () => {
  const categories = await getCategories();
  
  // Hash function for consistent background colors
  const hashId = (id) => id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);

  if (categories.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mt-[50px] mb-[50px] font-semibold text-xl">Popular Categories</h1>
        <p className="text-gray-600">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mt-[50px] mb-[50px] font-semibold text-xl text-center">Popular Categories</h1>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-around">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/blog?cat=${category.title}`}
            className={`flex gap-2 items-center ${
              [
                "bg-pink-200",
                "bg-yellow-200",
                "bg-green-200",
                "bg-violet-200",
                "bg-purple-200",
                "bg-orange-200",
              ][hashId(category.id) % 6]
            } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
          >
            <Image
              src={category.img || "/placeholder.png"}
              alt={`${category.title} category`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            <span>{category.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
