import React from "react";
import Image from "next/image"; 
import Link from "next/link";

const Card = () => {
  return (
    <div className="flex gap-[50px] mb-[50px] items-center">
      <div className="flex-1 relative w-auto h-[350px] hidden lg:block">
        <Image
          src="/p1.jpeg"
          alt="this is the post image"
          fill
          className="absolute w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col gap-[30px]">
        <div className="">
          <span className="text-gray-400">12.12.2024</span>
          <span className="text-red-600 font-semibold"> - CULTURE</span>
        </div>
        <Link href="/">
        <h1 className="font-bold text-xl" >Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
  
        </Link>
        <p className="font-[18px] font-md text-gray">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis
          distinctio laudantium saepe provident sunt maiores, ut aliquid at
          nihil modi sequi illum dolore nisi in blanditiis odit optio.
          Praesentium, similique.
        </p>
        <Link
         href="#" 
         className="border-b border-red-500 max-w-max pt-2 pb-1" 
        >ReadMore</Link>
      </div>
    </div>
  );
};

export default Card;
