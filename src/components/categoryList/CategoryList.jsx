import React from "react";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
    }

    const data = await res.json();
    console.log("Categories data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};


// Function to hash the category ID for consistent background colors
const hashId = (id) => {
  return id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

const CategoryList = async () => {
  const data = await getData();

  if (data.length === 0) {
    return (
      <div className="text-center">
        <h1 className="mt-[50px] mb-[50px] font-semibold text-xl">
          Popular Categories
        </h1>
        <p className="text-gray-600">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="mt-[50px] mb-[50px] font-semibold text-xl text-center">
        Popular Categories
      </h1>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-around">
        {data.map((category, index) => (
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
              src={category.img || "/placeholder.png"} // Fallback for missing image
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