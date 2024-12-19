"use client";

import React, { createContext, useState, useEffect } from 'react';

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Retrieve the theme from localStorage if available
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    setTheme(storedTheme || 'light');
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeContext;
