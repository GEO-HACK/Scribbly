import React from "react";
import Menu from "@/components/menu/Menu";
import Image from "next/image";
import Comments from "@/components/comments/Comments";

const singlePage = () => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-[30px] md:gap-[50px]">
        <div className="flex-1">
          {/* Title with responsive text size */}
          <h1 className="text-[24px] md:text-[32px] lg:text-[40px] mb-[30px] md:mb-[50px] font-bold">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </h1>
          <div className="flex gap-2 items-center">
            <div>
              <Image
                src="/p1.jpeg"
                alt=""
                width={30}
                height={30}
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm">Geo-Hack</span>
              <span className="text-[12px] text-gray-400 font-bold">
                12.12.2024
              </span>
            </div>
          </div>
        </div>
        {/* Hide image on smaller screens */}
        <div className="relative h-[350px] flex-1 hidden md:flex items-center justify-center">
          <Image
            src="/p1.jpeg"
            alt=""
            fill
            className="absolute object-cover rounded-md"
          />
        </div>
      </div>

      <div className="flex  gap-[20px] md:gap-[30px] mt-6">
        {/* Content Section */}
        <div className="w-full md:w-[70%]">
          <div className="flex flex-col gap-[20px] md:gap-[30px]">
            <p className="text-[16px] md:text-[18px] font-semibold">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              voluptate, quas, quae, quos dolorum nemo voluptatum quod
              repudiandae doloremque atque tempore. Quasi, quidem. Quasi,
              quidem.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Similique maxime doloremque nisi debitis iste provident reiciendis
              nihil? Nihil, adipisci magni, debitis blanditiis nemo consequatur
              recusandae sapiente dolor, itaque aliquid perferendis.
            </p>
            <h2 className="font-bold text-lg md:text-xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              pariatur consequuntur atque facilis quas soluta voluptatem iure
              nulla eveniet excepturi dolores id tempore, natus, dicta vero
              nihil, aspernatur animi ut.
            </p>
          </div>
          <div className="mt-10">
            <Comments />
          </div>
        </div>
        {/* Sidebar Menu */}
        <Menu />
      </div>
    </div>
  );
};

export default singlePage;
