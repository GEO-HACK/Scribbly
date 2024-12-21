import React from "react";
import Link from "next/link";
import Image from "next/image";

const MenuPosts = ({ withImage }) => {
  const posts = [
    { category: "Travel", bgColor: "bg-red-400", date: "12.12.2024", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { category: "Food", bgColor: "bg-violet-200", date: "12.12.2024", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { category: "Fashion", bgColor: "bg-orange-200", date: "12.12.2024", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { category: "Coding", bgColor: "bg-blue-200", date: "12.12.2024", title: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
  ];

  return (
    <div className="flex flex-col gap-3 mt-5 mb-4">
      {posts.map((post, index) => (
        <Link href="/" key={index}>
          <div className={`flex ${withImage ? "gap-[20px] items-center" : "flex-col"} w-full`}>
            {withImage && (
              <div className="max-w-[30%] relative w-10 h-10 border rounded-full border-gray-400">
                <Image
                  src="/p1.jpeg"
                  alt="the image"
                  fill
                  className="absolute rounded-full"
                />
              </div>
            )}
            <div className={`${withImage ? "max-w-[70%]" : "w-full"}`}>
              <span className={`${post.bgColor} rounded-xl px-4 text-[10px] py-1`}>
                {post.category}
              </span>
              <h3 className="text-[12px] font-semibold">{post.title}</h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">
                  {post.date}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;
