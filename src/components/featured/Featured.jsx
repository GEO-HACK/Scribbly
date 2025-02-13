import React from "react";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className="mt-8 px-4 lg:px-0">
      <h1 className="text-2xl lg:text-2xl font-bold text-center lg:text-left">
        <b>Hello devs !!</b> Discover my stories and new Creative ideas in the
        tech industry
      </h1>
      <div className="flex flex-col lg:flex-row mt-8 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="relative flex-1 h-[200px] sm:h-[300px] lg:h-[450px]">
          <Image
            src="/p1.jpeg"
            alt="this is the featured product"
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-4 items-start justify-center">
          <h1 className="text-lg lg:text-2xl font-semibold text-center lg:text-left">
            Capture your thoughts, shape your ideas and share your stories
          </h1>
          <p className="text-sm lg:text-md font-light text-gray-500 text-center lg:text-left">
            Scribbly is your space to write , create and share your stories with
            the world.Whether you are journaling , brainstorming or crafting the
            next big idea, we provide the tools to bring your words to
            life.Start writting today and let your ideas flow freely.
          </p>

          <div className="flex justify-center lg:justify-start w-full">
          <Link href="/about">
          <button className="px-6 py-2 text-white rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300">
              Read More
            </button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
