"use client";

import { getLocalStorageItem } from "@/utils/getLocalStorageItem";
import { createContext, ReactNode, useState } from "react";

export const ThemeContext = createContext<ThemeProviderProps | undefined>(
  undefined
);

interface ThemeProviderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    getLocalStorageItem("theme") === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
