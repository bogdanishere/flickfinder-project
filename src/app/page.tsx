"use client";

import MovieSearchForm from "@/components/MovieSearchForm";
import imageIcon from "@/images/icon-test.png";
import styles from "./page.module.scss";
import Image from "next/image";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieProvider } from "@/context/MovieSearchApi";
import MovieList from "@/components/MovieList";
import Footer from "@/components/Footer";

export default function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
