"use client";

import MovieSearchForm from "@/_components/MovieSearchForm";
import imageIcon from "@/images/icon-test.png";
import styles from "./page.module.scss";
import Image from "next/image";
import MovieList from "@/_components/MovieList";
import Footer from "@/_components/Footer";
import QueryProvider from "@/context/QueryProvider";
import { MovieProvider } from "@/context/MovieSearchApi";
import { useEffect, useState } from "react";
import Spinner from "@/_components/Spinner";

export default function Home() {
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
        <header className={styles.background}>
          <div className={styles["header"]}>
            <div className={styles["header__logo-box"]}>
              <Image
                src={imageIcon}
                alt="test"
                className={styles["header__logo"]}
              />
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
        </header>
        <main className={styles.main}>
          <MovieList />
        </main>
        <Footer />
      </MovieProvider>
    </QueryProvider>
  );
}
