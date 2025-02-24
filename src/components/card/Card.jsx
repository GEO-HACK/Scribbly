"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify";
import { Heart, MessageCircle } from "lucide-react";

const Card = ({ item }) => {
  console.log(item);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item._count.comments);

  const HandleClick = () => {
    setLiked(!liked);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  function stringHtmlTags(html) {
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: [] }); // Removes all tags
  }

  const description = stringHtmlTags(item.desc);

  return (
    <div className="flex gap-[50px] mb-[50px] items-center">
      {/* Image Section */}
      <div className="flex-1 relative w-auto h-[250px] hidden lg:block">
        {item.img && (
          <Image
            src={item.img || "/placeholder.jpg"}
            alt="Post image"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="absolute w-full h-full"
          />
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-[30px]">
        <div>
          <span className="text-gray-400">
            {item.createdAt.substring(0, 10)} -{" "}
          </span>
          <span className="text-red-600 font-semibold">
            {item.catSlug.toUpperCase()}
          </span>
        </div>

        <Link href={`/posts/${item.slug}`}>
          <h1 className="font-bold text-xl">{item.title}</h1>
          <p className="font-[18px] font-md text-gray">
            {description.substring(0, 80)}
          </p>
        </Link>

        {/* Footer Section */}
        <div className="flex flex-row justify-between items-center align-baseline">
          {/* User Info */}
          <div className="flex items-center gap-2">
            <Image
              src={item.user.image || "/placeholder.jpg"}
              alt="User avatar"
              width={20}
              height={20}
              className="w-10 h-10 rounded-full"
            />
            <span className="font-semibold text-[8px]">{item.user.name}</span>
          </div>

          {/* Like Button */}
          <div className="gap-[10px] flex flex-row items-center">
            {liked ? (
              <Heart
                className="text-red-500 fill-red-500 cursor-pointer"
                onClick={HandleClick}
              />
            ) : (
              <Heart
                className="text-gray-500 cursor-pointer"
                onClick={HandleClick}
              />
            )}
            <span className="text-red-600 font-semibold">{likesCount}</span>
          </div>

          {/* Comment Section */}
          <div className="gap-[10px] flex flex-row items-center">
            <MessageCircle className="text-gray-500" />
            <span className="text-gray-400 font-semibold">
              {item._count.comments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

