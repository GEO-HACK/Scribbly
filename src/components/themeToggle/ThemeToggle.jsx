"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(null); // Start with null to avoid hydration mismatch

  useEffect(() => {
    // Fetch theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply theme to the root element
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Save and apply the new theme
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Prevent rendering the toggle until the theme is determined
  if (!theme) return null;

  return (
    <div
      onClick={toggleTheme}
      className={`relative flex w-[40px] h-[20px] rounded-[50px] ${
        theme === "dark" ? "bg-white" : "bg-black"
      } items-center justify-between px-1 cursor-pointer`}
    >
      <Image src="/moon.png" alt="moon icon" width={14} height={14} />
      <div
        className={`absolute w-[15px] h-[15px] rounded-full transition-all ${
          theme === "dark" ? "bg-black left-[22px]" : "bg-white left-[2px]"
        }`}
      />
      <Image src="/sun.png" alt="sun icon" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
