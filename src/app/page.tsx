"use client";

import MovieSearchForm from "@/_components/MovieSearchForm";

import styles from "@/styles/pages/main-page.module.scss";

import MovieList from "@/_components/MovieList";
import Footer from "@/_components/Footer";
import QueryProvider from "@/_context/QueryProvider";
import { MovieProvider } from "@/_context/MovieSearchApi";
import { useEffect, useState } from "react";
import Spinner from "@/_components/Spinner";
import { useTheme } from "@/_hooks/useTheme";
import ThemeChange from "@/_components/ThemeChange";

export default function Home() {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Spinner />;
  }

  return (
    <QueryProvider>
      <MovieProvider>
        <header className={styles["u-padding-30"]}>
          <div
            className={`${styles.background} ${styles[`background-${theme}`]}`}
          >
            <div
              className={`${styles["header"]} ${styles[`header--${theme}`]}`}
            >
              <div className={styles["header__logo-box"]}>
                <ThemeChange />
              </div>
              <div className={styles["header__text-box"]}>
                <h1 className={styles["heading-primary"]}>
                  <span className={styles["heading-primary-main"]}>
                    FlickFinder
                  </span>
                  <span className={styles["heading-primary-sub"]}>
                    Uncover new stories
                  </span>
                </h1>
                <MovieSearchForm />
              </div>
            </div>
          </div>

          <main className={`${styles.main} ${styles[`main--${theme}`]}`}>
            <MovieList />
          </main>
          <Footer />
        </header>
      </MovieProvider>
    </QueryProvider>
  );
}
