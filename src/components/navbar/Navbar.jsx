"use client"

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";

const Navbar = () => {
    const [isMenuopen, setIsMenuopen] = useState(false)

    const toggleMenu = ()=>{
        setIsMenuopen(!isMenuopen)
    }

    const closeMenu = ()=>
    {
        setIsMenuopen(false)
    }
  return (
    <div className="flex-1 flex justify-between h-[100px] items-center">
      {/* Social Handles */}
      <div className=" gap-2 flex-1  sm:flex">
        <Image
          src="/facebook.png"
          alt="Facebook logo"
          width={24}
          height={24}
        />
        <Image
          src="/instagram.png"
          alt="Instagram logo"
          width={24}
          height={24}
        />
        <Image src="/tiktok.png" alt="TikTok logo" width={24} height={24} />
        <Image src="/youtube.png" alt="YouTube logo" width={24} height={24} />
      </div>

      {/* Brand Name */}
      <div className="flex-1 font-bold text-[36px] text-center">Scribbly</div>

      {/* Navigation Links and Theme Toggle */}
      <div className="flex-1 flex gap-3 px-2 text-sm font-semibolda">
        <ThemeToggle />

        {/* burger menu */}
        <button 
        onClick={toggleMenu}
        className="block sm:hidden text-xl focus:outline-none"
        >
            ☰ 
        </button>
        <div
          className={`absolute top-[100px] left-0 w-full bg-background shadow-md p-4 sm:static sm:bg-transparent sm:shadow-none sm:p-0 sm:flex sm:gap-2 ${
            isMenuopen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <Link
            onClick={closeMenu}
             href="/" className="block py-2 sm:py-0">
              HomePage
            </Link>
            <Link
            onClick={closeMenu}

             href="/contact" className="block py-2 sm:py-0">
              Contact
            </Link>
            <Link
            onClick={closeMenu}
             href="/about" className="block py-2 sm:py-0">
              About
            </Link>
            <AuthLinks />
          </div>
          </div>
      </div>
    </div>
  );
};

export default Navbar;
