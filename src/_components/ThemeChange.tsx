"use client";

import Moon from "./Moon";
import Sun from "./Sun";
import Image from "next/image";
import styles from "@/styles/pages/themeChange.module.scss";
import { useTheme } from "@/_hooks/useTheme";
import imageIcon from "@/images/icon-test.png";
import Link from "next/link";

export default function ThemeChange() {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <div className={styles.container}>
      <Link href="/">
        <Image src={imageIcon} alt="imageIcon" className={styles.logo} />
      </Link>
      <button
        onClick={handleToggleTheme}
        className={styles.themeToggle}
        aria-label="Toggle Theme"
      >
        <Sun
          className={`${styles.icon} ${styles.sunIcon} ${
            theme === "dark" ? styles.hidden : ""
          }`}
        />
        <Moon
          className={`${styles.icon} ${styles.moonIcon} ${
            theme === "dark" ? "" : styles.hidden
          }`}
        />
      </button>
    </div>
  );
}
