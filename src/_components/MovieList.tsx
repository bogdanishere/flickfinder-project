"use client";

import React, { useMemo, useState } from "react";
import Spinner from "./Spinner";
import { useMovie } from "../context/useApi";
import Image from "next/image";
import NotFound from "./NotFound";

import styles from "../styles/pages/movieList.module.scss";
import Link from "next/link";

const MovieList: React.FC = () => {
  const { movies, isLoading, isError } = useMovie();
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s";

  const handleImageError = (imdbID: string) => {
    setFailedImages((prev) => [...prev, imdbID]);
  };

  const filteredMovies = useMemo(
    () =>
      movies.filter(
        (movie) =>
          !failedImages.includes(movie.imdbID) && movie.Poster !== "N/A"
      ),
    [movies, failedImages]
  );

  if (isLoading) return <Spinner />;
  if (isError) return <NotFound />;
  if (filteredMovies.length === 0)
    return (
      <div className={styles["u-center-text"]}>
        <p
          className={`${styles["u-margin-top-huge"]} ${styles["u-text-big"]} ${styles["heading-secondary"]}`}
        >
          There are no movies available right now. Start searching to discover
          new stories!
        </p>
      </div>
    );

  return (
    <div className={styles["movie-list"]}>
      {filteredMovies.map((movie) => (
        <div key={movie.imdbID} className={styles["card"]}>
          <div
            className={`${styles["card__side"]} ${styles["card__side--front"]}`}
          >
            <Image
              className={styles["card__picture"]}
              width={200}
              height={300}
              src={movie.Poster === "N/A" ? fallbackImage : movie.Poster}
              alt={`Poster for ${movie.Title}`}
              onError={() => handleImageError(movie.imdbID)}
            />
          </div>

          <div
            className={`${styles["card__side"]} ${styles["card__side--back"]}`}
          >
            <div className={styles["card__details"]}>
              <h2 className={styles["u-center-text"]}>{movie.Title}</h2>
              <p>{movie.Year}</p>
              <p className={styles["u-padding-bottom"]}>
                Category: {movie.Type}
              </p>
              <Link href={`/multimedia/${movie.imdbID}`}>
                <button
                  className={`${styles["btn"]} ${styles["btn--animated"]}`}
                >
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
