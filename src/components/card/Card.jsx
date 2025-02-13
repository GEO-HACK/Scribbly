import React from "react";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "dompurify"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

const Card = ({ item }) => {
  console.log(item);


  function stringHtmlTags(html){
    return DOMPurify.sanitize(html, { ALLOWED_TAGS: []})// Removes all tags
  }

  const description = stringHtmlTags(item.desc);
  return (
    <Link href={`/posts/${item.slug}`}>
       <div className="flex gap-[50px] mb-[50px] items-center">
      <div className="flex-1 relative w-auto h-[250px] hidden lg:block">
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

        <div className="flex flex-row justify-between items-center align-baseline">
          <div>
          <Image  
            src={item.user.image || "/placeholder.jpg"}
            alt="this is the user image"
            width={20}
            height={20}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-semibold text-[8px]">{item.user.name}</span>
          </div>

          <div>
            <FontAwesomeIcon icon={faComment} />
            <span className="text-gray-400 font-semibold">{item._count.comments}</span>
          </div>

        
     
        </div>
      </div>
    </div>
    </Link>
   
  );
};

export default Card;
