import React from "react";
import Image from "next/image";
import Link from "next/link";

const CategoryList = () => {
  return (
    <div className="">
      <h1 className="mt-[50px] mb-[50px] font-semibold text-xl">
        Popular Categories
      </h1>
      <div className="flex flex-wrap justify-center gap-4 sm:justify-around">
        <Link
          href="/blog?cat=style"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200", 
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][0]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/style.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Style
        </Link>
        <Link
          href="/blog?cat=fashion"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][1]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/fashion.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Fashion
        </Link>
        <Link
          href="/blog?cat=food"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][2]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/food.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Food
        </Link>
        <Link
          href="/blog?cat=travel"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][3]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/travel.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Travel
        </Link>
        <Link
          href="/blog?cat=culture"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][4]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/culture.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Culture
        </Link>
        <Link
          href="/blog?cat=coding"
          className={`flex gap-2 items-center ${
            [
              "bg-pink-200",
              "bg-yellow-200",
              "bg-blue-200",
              "bg-violet-200",
              "bg-green-200",
              "bg-red-200",
            ][5]
          } p-2 w-[150px] justify-center rounded-md text-gray-600 font-semibold`}
        >
          <Image
            src="/coding.png"
            alt="category image"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          Coding
        </Link>
      </div>
    </div>
  );
};

export default CategoryList;
