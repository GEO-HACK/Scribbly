"use client";

import React, { useState } from "react";
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
      {/* Logo */}
      <div className="hidden sm:flex items-center gap-3">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Scribbly
        </h1>
      </div>

      {/* Desktop Navigation + Theme Toggle */}
      <div className="hidden sm:flex items-center gap-6">
        {["/", "/posts", "/contact"].map((path, index) => (
          <Link
            key={index}
            href={path}
            prefetch={true}
            className="text-sm relative px-3 py-1 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {path === "/"
              ? "Home"
              : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
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
        className="sm:hidden text-2xl text-gay-300 focus:outline-none"
      >
        ☰
      </button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-[80px] left-0 w-full bg-white dark:bg-gray-900 shadow-lg sm:hidden"
        >
          <div className="flex flex-col p-4 gap-4">
            {["/", "/contact", "/about"].map((path, index) => (
              <Link
                key={index}
                href={path}
                prefetch={true}
                onClick={closeMenu}
                className="text-sm py-2 border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").charAt(0).toUpperCase() + path.slice(2)}
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
