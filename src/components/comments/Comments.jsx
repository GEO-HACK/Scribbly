"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSession } from "next-auth/react";

// Fetcher function to get data from the API
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch comments");
  }
  return data;
};

const Comments = ({ postSlug }) => {
  const { status } = useSession(); // Get session status
  const { data, mutate, isLoading } = useSWR(
    `/api/comments?postSlug=${postSlug}`,
    fetcher
  );
  const [desc, setDesc] = useState(""); // State for comment description
  const [isSubmiting, setIsSubmiting] = useState(false);//loading state for the submission


  // Handle form submission to add a comment
  const handleSubmit = async () => {
    try {

      setIsSubmiting(true);//set loading state to true

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ desc, postSlug }), // Send data to the API
      });

      const text = await res.text(); // Get raw response text for debugging
      console.log("Raw response:", text);

      if (!res.ok) {
        throw new Error(`Server error: ${res.status} - ${res.statusText}`);
      }

      const data = JSON.parse(text); // Parse the JSON response
      console.log("Parsed data:", data);

      mutate(); // Refresh comments list after submitting
      setDesc(""); // Clear textarea after submission
    } catch (err) {
      console.error("Error submitting comment:", err.message);
    }
    finally{
      setIsSubmiting(false);//set loading state to false
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-gray-400 font-bold">Comments</h1>

      {/* Commenting Form */}
      {status === "authenticated" ? (
        <div className="flex gap-3">
          <textarea
            placeholder="Write a comment ..."
            className="mt-2 w-[600px] text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-none"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} // Update textarea state
          ></textarea>
          <button
            className="px-4 py-2 bg-green-400 text-white rounded-lg hover:bg-green-500"
            onClick={handleSubmit} // Call handleSubmit when clicked
            disabled={isSubmiting}//disable the button when loading
          >
            {isSubmiting ? "sending..." : "Send"}
          </button>
        </div>
      ) : (
        <Link href="/login" className="text-sm text-violet-500 hover:underline">
          Login to write a comment
        </Link>
      )}

      {/* Comments Display */}
      <div className="mt-4 flex flex-col gap-5">
        {isLoading ? (
          "Loading..."
        ) : data && data.length > 0 ? (
          data.map((item) => (
            <div className="flex flex-col gap-1" key={item.id}>
              <div className="flex gap-3 items-center">
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt="profile image"
                    width={30}
                    height={30}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}

                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{item.user.name}</span>
                  <span className="text-[12px] text-gray-400 font-bold">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))
        ) : (
          "No comments available"
        )}
      </div>
    </div>
  );
};

export default Comments;
