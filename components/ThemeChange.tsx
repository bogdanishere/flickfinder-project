"use client";

import { useTheme } from "@/contexts/ThemeProvider";
import icon from "@/public/icon.png";
import Image from "next/image";
import Sun from "./Sun";
import Moon from "./Moon";
import { useRouter } from "next/navigation";

export default function ThemeChange() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const handleGoBack = () => {
    router.replace("/1");
  };

  return (
    <nav className="absolute w-full flex justify-between items-center px-12 lg:px-20 py-10 lg:py-12 z-50">
      <button className="flex items-center" onClick={handleGoBack}>
        <Image
          src={icon}
          alt="icon"
          className="h-14 w-auto sm:h-16 md:h-24 lg:h-32 xl:h-40 cursor-pointer transition-transform hover:scale-105"
          priority
        />
      </button>

      <button
        className="relative p-2 sm:p-3 transition-colors duration-200 focus:outline-none cursor-pointer"
        onClick={handleThemeChange}
        aria-label={
          theme === "light" ? "Switch to dark mode" : "Switch to light mode"
        }
      >
        <div className="relative h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-32 xl:w-32">
          <Sun
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              theme === "dark" ? "opacity-0" : "opacity-100"
            }`}
          />
          <Moon
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              theme === "light" ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
      </button>
    </nav>
  );
}
