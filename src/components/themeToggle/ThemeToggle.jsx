// ThemeToggle.js
"use client";

import React, { useContext } from 'react';
import Image from 'next/image';
import ThemeContext from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleToggle = () => {
    setTheme(); // Toggle the theme
  };

  return (
    <div
      className={`relative flex w-[40px] h-[20px] rounded-[50px] items-center justify-between px-1 cursor-pointer ${
        theme === 'dark' ? 'bg-black' : 'bg-gray-400'
      }`}
      onClick={handleToggle} // Handle the toggle on click
    >
      <Image src="/moon.png" alt="moon image" width={14} height={14} />
      <div
        className={`absolute bg-white w-[15px] h-[15px] rounded-full transition-transform ${
          theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'
        }`}
      />
      <Image src="/sun.png" alt="sun image" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
