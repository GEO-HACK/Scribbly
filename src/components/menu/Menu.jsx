import React from "react";
import Image from "next/image";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="max-w-[30%] mt-[30px]">
      <h2 className="text-gray-500 font-semibold">what's hot</h2>
      <h1 className="text-xl font-semibold">Most Popular</h1>

      <div className="flex flex-col gap-3 mt-5 mb-4">
        <Link href="/">
          <div className="flex gap-[20px] items-center">
          
            <div className="">
              <span className="bg-red-400 rounded-xl px-4 text-[10px] py-1">
                Travel
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="flex gap-[20px] items-center">
           
            <div className="">
              <span className="bg-violet-200 rounded-xl px-4 text-[10px] py-1">
                Food
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link> <Link href="/">
          <div className="flex gap-[20px] items-center">
           
            <div className="">
              <span className="bg-orange-200 rounded-xl px-4 text-[10px] py-1">
                Fashion
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link> <Link href="/">
          <div className="flex gap-[20px] items-center">
          
            <div className="">
              <span className="bg-blue-200 rounded-xl px-4 text-[10px] py-1">
                Coding
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <h2 className="text-gray-500 font-semibold">Chosen by the editor</h2>
      <h1 className="text-xl font-semibold">Editors Pick</h1>

      <div className="flex flex-col gap-3 mt-5 mb-4">
        <Link href="/">
          <div className="flex gap-[20px] items-center">
            <div className="max-w-[30%] relative  w-10 h-10  border rounded-full border-gray-400">
              <Image
                src="/p1.jpeg"
                alt="the image"
                fill
                className="absolute rounded-full "
              />
            </div>
            <div className="max-w-[70%]">
              <span className="bg-red-400 rounded-xl px-4 text-[10px] py-1">
                Travel
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link>
        <Link href="/">
          <div className="flex gap-[20px] items-center">
            <div className="max-w-[30%] relative  w-10 h-10  border rounded-full border-gray-400">
              <Image
                src="/p1.jpeg"
                alt="the image"
                fill
                className="absolute rounded-full "
              />
            </div>
            <div className="max-w-[70%]">
              <span className="bg-violet-200 rounded-xl px-4 text-[10px] py-1">
                Food
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link> <Link href="/">
          <div className="flex gap-[20px] items-center">
            <div className="max-w-[30%] relative  w-10 h-10  border rounded-full border-gray-400">
              <Image
                src="/p1.jpeg"
                alt="the image"
                fill
                className="absolute rounded-full "
              />
            </div>
            <div className="max-w-[70%]">
              <span className="bg-orange-200 rounded-xl px-4 text-[10px] py-1">
                Fashion
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link> <Link href="/">
          <div className="flex gap-[20px] items-center">
            <div className="max-w-[30%] relative  w-10 h-10  border rounded-full border-gray-400">
              <Image
                src="/p1.jpeg"
                alt="the image"
                fill
                className="absolute rounded-full "
              />
            </div>
            <div className="max-w-[70%]">
              <span className="bg-blue-200 rounded-xl px-4 text-[10px] py-1">
                Coding
              </span>
              <h3 className="text-[12px] font-semibold ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              
              </h3>
              <div className="text-sm">
                <span className="text-[12px]">Geo-Hack - </span>
                <span className="font-light text-[10px] text-gray-400">12.12.2024</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
