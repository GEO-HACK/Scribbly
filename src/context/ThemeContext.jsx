"use client";

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(null); // Start with null to avoid SSR mismatch

  useEffect(() => {
    // Get theme from localStorage or default to "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply the theme to the HTML element immediately
    document.documentElement.classList.add(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Update localStorage and HTML element's class
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove(theme); // Remove current theme class
    document.documentElement.classList.add(newTheme); // Add new theme class
  };

  // Prevent rendering children until theme is set to avoid SSR mismatches
  if (theme === null) return null;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
