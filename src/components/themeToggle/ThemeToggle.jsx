'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
      ? "dark"
      : "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      onClick={toggleTheme}
      className={`relative flex w-[40px] h-[20px] rounded-[50px] ${
        theme === "dark" ? "bg-white" : "bg-black"
      } items-center justify-between px-1 cursor-pointer`}
    >
      <Image src="/moon.png" alt="moon image" width={14} height={14} />
      <div
        className={`absolute w-[15px] h-[15px] rounded-full ${
          theme === "dark" ? "bg-black left-[22px]" : "bg-white left-[2px]"
        } transition-all`}
      />
      <Image src="/sun.png" alt="sun image" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
