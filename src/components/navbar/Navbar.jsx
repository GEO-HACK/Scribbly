"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../themeToggle/ThemeToggle";
import AuthLinks from "../authLinks/AuthLinks";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme(); // Get current theme

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="flex justify-between items-center h-[80px] px-6 md:px-10 border-b border-gray-200 dark:border-gray-700">
      {/* Social Media Icons */}
      <div className="hidden sm:flex items-center gap-3">
        {["facebook", "instagram", "tiktok", "youtube"].map((platform) => (
          <Image
            key={platform}
            src={`/${platform}.png`}
            alt={`${platform} logo`}
            width={24}
            height={24}
            className="hover:scale-110 transition-transform"
          />
        ))}
      </div>

      {/* Brand Name */}
      <h1 className="text-3xl font-bold text-center">Scribbly</h1>

      {/* Desktop Navigation + Theme Toggle */}
      <div className="hidden sm:flex items-center gap-6">
        {["/", "/contact", "/about"].map((path, index) => (
          <Link
            key={index}
            href={path}
            prefetch={true}
            
            className={`relative px-3 py-1 font-semibold transition-colors ${
              theme === "dark"
                ? "text-gray-200 hover:text-blue-400"
                : "text-gray-800 hover:text-blue-600"
            }`}
          >
            {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
            <motion.div
              className="absolute left-0 bottom-0 w-full h-[2px] bg-current"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Link>
        ))}
        <AuthLinks />
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="sm:hidden text-2xl focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[80px] left-0 w-full bg-background shadow-lg sm:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            {["/", "/contact", "/about"].map((path, index) => (
              <Link
                key={index}
                href={path}
                prefetch={true}
                onClick={closeMenu}
                className="text-sm py-2 border-b dark:border-gray-600 hover:text-blue-500 transition-colors"
              >
                {path === "/" ? "Home" : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
              </Link>
            ))}
            <AuthLinks />
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
