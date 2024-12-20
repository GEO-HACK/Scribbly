"use client"

import { createContext, useState, useEffect } from "react"

export const ThemeContext = createContext()

// Function to get the theme from localStorage only on the client-side
const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {  // Ensure we're on the client-side
    const value = localStorage.getItem("theme")
    return value || "light"
  }
  return "light" // Default theme if running on the server
}

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Only run on the client-side to avoid SSR errors
    setTheme(getFromLocalStorage())
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
