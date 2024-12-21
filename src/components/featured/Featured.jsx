import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-8 px-4 lg:px-0">
      <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left">
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
          <h1 className="text-2xl lg:text-3xl font-semibold text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing
          </h1>
          <p className="text-sm lg:text-md font-light text-gray-500 text-center lg:text-left">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit at
            dolor et earum doloremque, numquam cum obcaecati iste aspernatur
            impedit. Porro est nisi nobis, ad facilis repellat doloremque fuga
            sed.
          </p>

          <div className="flex justify-center lg:justify-start w-full">
            <button
              className="px-6 py-2 text-white rounded-md bg-gray-800 hover:bg-gray-700 transition duration-300"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
