import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
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
          <h1 className="text-xl font-semibold">Scribbly</h1>
        </div>
        <p className="text-[12px]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          delectus, odit aliquid recusandae nemo accusantium sint aut, facilis
          itaque quos culpa tenetur ab officia placeat ea ex quam? Eligendi, et?
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
          <Link href="/" className="text-gray-500 text-[14px]">HomePage</Link>
          <Link href="/blog" className="text-gray-500 text-[14px]">Blog</Link>
          <Link href="/about" className="text-gray-500 text-[14px]">About</Link>
          <Link href="/contact" className="text-gray-500 text-[14px]">Contact</Link>
        </div>

        {/* Tags Column */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-md">Tags</h1>
          <Link href="/" className="text-gray-500 text-[14px]">Style</Link>
          <Link href="/blog" className="text-gray-500 text-[14px]">Fashion</Link>
          <Link href="/about" className="text-gray-500 text-[14px]">Coding</Link>
          <Link href="/contact" className="text-gray-500 text-[14px]">Travel</Link>
        </div>

        {/* Social Column */}
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-md">Social</h1>
          <Link href="/" className="text-gray-500 text-[14px]">Facebook</Link>
          <Link href="/" className="text-gray-500 text-[14px]">Instagram</Link>
          <Link href="/" className="text-gray-500 text-[14px]">TikTok</Link>
          <Link href="/" className="text-gray-500 text-[14px]">YouTube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
