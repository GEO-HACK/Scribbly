import React from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify"

const Card = ({ item }) => {


  function stringHtmlTags(html){
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: []})// Removes all tags
  }

  const description = stringHtmlTags(item.desc);
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
            {item.createdAt.substring(0, 10)}-{"  "}
          </span>
          <span className="text-red-600 font-semibold">
            {" "}
            {item.catSlug.toUpperCase()}
          </span>
        </div>
        <Link href={`/posts/${item.slug}`} >
          <h1 className="font-bold text-xl">{item.title}</h1>
        </Link>
        <p className="font-[18px] font-md text-gray">{description.substring(0,80)}</p>
        <Link href={`/posts/${item.slug}`} className="border-b border-red-500 max-w-max pt-2 pb-1">
          ReadMore
        </Link>
      </div>
    </div>
  );
};

export default Card;
