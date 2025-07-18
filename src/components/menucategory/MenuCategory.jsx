
import React from 'react'
import Link from 'next/link'

const getData = async () => {
  try {
    // Return empty array during build to prevent API calls
    return [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
} 

const hashId = (id) => {  
  return id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}


const MenuCategory = async () => {
  const data =await getData();
  return (
    <div className="flex flex-wrap gap-2 mt-3 mb-3">
    {data?.map((category, index) => (
      <Link
        key={category.id}
        href={`/blog?cat=${category.title}`}
        className={`text-sm ${
          [
            "bg-pink-200",
            "bg-yellow-200",
            "bg-green-200",
            "bg-violet-200",
            "bg-purple-200",
            "bg-orange-200",
          ][hashId(category.id) % 6]
        } p-2 rounded-lg`}
      >
        {category.title}
      </Link>
    ))}
    
  </div>
  );
}

export default MenuCategory;
