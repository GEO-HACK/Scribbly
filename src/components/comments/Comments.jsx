"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();
  console.log("This is the data:",data)

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }
  return data;
};

const Comments = ({ postSlug }) => {

  console.log(postSlug)
  const { status } = useSession();

  const { data, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  
  return (
    <div className="">
      <h1 className="text-2xl text-gray-400 font-bold">Comments</h1>
      {status === "authenticated" ? (
        <div className="flex  gap-3">
          <textarea
            placeholder="Write a comment ..."
            className="mt-2 w-[600px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
          ></textarea>
          <button className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500">
            Send
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-sm text-violet-500 hover:underline">
          Login to write a comment
        </Link>
      )}

      <div className="mt-4 flex flex-col gap-5" >
        {isLoading
          ? "loading"
          :data && data.length > 0
          ? data.map((item) => (
              <div className="flex flex-col gap-1" key={item.id}>
                <div className="flex gap-3 items-center ">
                  {item?.user?.image && 
                  <Image
                  src={item.user.image}
                  alt="profile image"
                  width={30}
                  height={30}
                  className="w-12 h-12  rounded-full object-cover"
                />
                  
                  }

                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{item.user.name}</span>
                    <span className="text-[12px] text-gray-400 font-bold">
                    {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-sm">
                 {item.desc}
                </p>
              </div>
            ))
          :"No comments available"}
      </div>
    </div>
  );
};

export default Comments;
