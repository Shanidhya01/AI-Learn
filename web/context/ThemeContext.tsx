"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ai-dash-theme");
    if (saved === "dark") setDark(true);
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      localStorage.setItem("ai-dash-theme", !d ? "dark" : "light");
      return !d;
    });
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      <div className={dark ? "theme-dark" : "theme-light"} style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);