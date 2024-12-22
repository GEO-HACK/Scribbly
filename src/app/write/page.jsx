"use client";

import React,{useState} from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import default theme


const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


const page = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("")

  const handleClick = () => {
    setOpen(!open);
  }
  return (
    <div>
      <input type="text" placeholder="Title" />
      <div className=" flex gap-8 items-center mt-5">
        <button className="">
          <Image
            src="/plus.png"
            alt="this image"
            width={30}
            height={30}
            className="rounded-full"
            onClick={handleClick}
          />
        </button>
        {open && (
          <div className="flex gap-4 items-center">
            <button className="">
              <Image
                src="/plus.png"
                alt="this image"
                width={30}
                height={30}
                className="rounded-full"
              />
            </button>{" "}
            <button className="">
              <Image
                src="/plus.png"
                alt="this image"
                width={30}
                height={30}
                className="rounded-full"
              />
            </button>{" "}
            <button className="">
              <Image
                src="/plus.png"
                alt="this image"
                width={30}
                height={30}
                className="rounded-full"
              />
            </button>
          </div>
        )}

        <ReactQuill theme="bubble" value={value} onChange={(content)=> setValue(content)} placeholder="Tell your story.."/>

      </div>
    </div>
  );
};

export default page;
