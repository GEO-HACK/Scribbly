import React from "react";
import Image from "next/image";

const Featured = () => {
  return (
    <div className="mt-[30px]">
      <h1 className="text-[50px] ">
        <b>Hello devs !! </b> Discover my stories and new Creative  ideas in the tech industry
      </h1>
      <div className="flex mt-[30px] gap-[50px] ">
        <div className="relative flex-1 h-[450px]">
          <Image src="/p1.jpeg" alt="thi is the features product" fill  className="object-cover"/>
        </div>
        <div className="flex-1 flex flex-col gap-[20px] items-start justify-center">
      
          <h1 className="text-[35px] font-semibold">Lorem ipsum dolor sit amet consectetur adipisicing</h1>
          <p className="text-md font-[300px] text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit at
            dolor et earum doloremque, numquam cum obcaecati iste aspernatur
            impedit. Porro est nisi nobis, ad facilis repellat doloremque fuga
            sed.
          </p>
          <button className="px-5 py-2 bg-black text-white rounded-md max-w-max">ReadMore</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
