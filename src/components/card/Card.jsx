import React from "react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ item }) => {
  return (
    <div className="flex gap-[50px] mb-[50px] items-center">
      <div className="flex-1 relative w-auto h-[350px] hidden lg:block">
        {item.img && (
          <Image
            src={item.img || "/placeholder.jpg"}
            alt="this is the post image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute w-full h-full"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-[30px]">
        <div className="">
          <span className="text-gray-400">
            {item.createdAt.substring(0, 10)}
          </span>
          <span className="text-red-600 font-semibold">
            {" "}
            - {item.catSlug.toUpperCase()}
          </span>
        </div>
        <Link href="/">
          <h1 className="font-bold text-xl">{item.title}</h1>
        </Link>
        <p className="font-[18px] font-md text-gray">{item.desc}</p>
        <Link href="#" className="border-b border-red-500 max-w-max pt-2 pb-1">
          ReadMore
        </Link>
      </div>
    </div>
  );
};

export default Card;
