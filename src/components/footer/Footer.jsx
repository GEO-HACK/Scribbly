"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const [categories, setCategories] = useState([]);

    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
            cache: "no-cache",
          });
          const data = await res.json();
          setCategories(data);
          console.log(data,"this  is the data")
        } catch (error) {
          console.error("Failed to fetch categories", error);
        }
      };
      fetchCategories();  
    }, []);
  
    
  return (
    <div className="flex lg:flex-row flex-col gap-10 lg:gap-[100px] mt-16 mb-5 px-5">
      {/* Logo and Description Section */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            alt="this is an image"
            width={30}
            height={30}
            className="w-12 h-12 rounded-full"
          />
          <h1 className="text-xl font-semibold"> <span className="text-red-500">FLOW</span>NOTE</h1>
        </div>
        <p className="text-[12px]">
        <span className="text-red-500">Flow</span>note is a space for creativity, ideas, and stories. Whether you're
          sharing thoughts, documenting experiences, or exploring new
          perspectives, Scribbly makes it simple and engaging. Write, express,
          and connect—one post at a time."
        </p>
        <div className="flex gap-4">
          <Image
            src="/facebook.png"
            alt="Facebook logo"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Image
            src="/instagram.png"
            alt="Instagram logo"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Image
            src="/tiktok.png"
            alt="TikTok logo"
            width={24}
            height={24}
            className="cursor-pointer"
          />
          <Image
            src="/youtube.png"
            alt="YouTube logo"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Links Section */}
      <div className="flex-1 flex lg:flex-row flex-col gap-10 justify-between">
        {/* Links Column */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-md">Links</h1>
          <Link href="/" className="text-gray-500 text-[14px]">
            HomePage
          </Link>
          <Link href="/blog" className="text-gray-500 text-[14px]">
            Blog
          </Link>
       
          <Link href="/contact" className="text-gray-500 text-[14px]">
            Contact
          </Link>
        </div>

        {/* Tags Column */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-md">Tags</h1>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog?cat=${category.slug}`}
              className="text-gray-500 text-[14px]"
            >
              {category.slug}
            </Link>
          ))}
          
         
         
        </div>

        {/* Social Column */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-md">Social</h1>
          <Link href="/" className="text-gray-500 text-[14px]">
            Facebook
          </Link>
          <Link href="/" className="text-gray-500 text-[14px]">
            Instagram
          </Link>
          <Link href="/" className="text-gray-500 text-[14px]">
            TikTok
          </Link>
          <Link href="/" className="text-gray-500 text-[14px]">
            YouTube
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
