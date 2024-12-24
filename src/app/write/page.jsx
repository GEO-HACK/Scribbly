"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Quill's styling

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [mounted, setMounted] = useState(false); // Track if mounted

  useEffect(() => {
    setMounted(true); // Ensure component only renders fully on the client
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className="p-4">
      {/* Title Input */}
      <input
        type="text"
        placeholder="Title"
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Toggle Buttons */}
      <div className="flex gap-8 items-center mt-5">
        <button onClick={handleClick} aria-label="Toggle additional options">
          <Image
            src="/plus.png"
            alt="Open options"
            width={30}
            height={30}
            className="rounded-full cursor-pointer"
            priority={true} // Ensure image is loaded properly
          />
        </button>

        {open && (
          <div className="flex gap-4 items-center">
            {[...Array(3)].map((_, idx) => (
              <button key={idx} aria-label={`Option ${idx + 1}`}>
                <Image
                  src="/plus.png"
                  alt={`Option ${idx + 1}`}
                  width={30}
                  height={30}
                  className="rounded-full cursor-pointer"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ReactQuill Editor */}
      <div className="mt-5">
        {mounted && (
          <ReactQuill
            theme="bubble"
            value={value}
            onChange={(content) => setValue(content)}
            placeholder="Tell your story..."
            className="bg-white border border-gray-300 rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default Page;
