"use client";

import { extractRating } from "@/utils/extragRating";
import StarRating from "./StarRating";
import styles from "@/styles/pages/multimedia.module.scss";
import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@/_hooks/useTheme";
import ThemeChange from "./ThemeChange";

function Multimedia({
  data,
}: {
  data: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    Error?: string;
  };
}) {
  const { theme } = useTheme();
  const validPoster =
    data.Poster && data.Poster !== "N/A" && data.Poster.trim() !== ""
      ? data.Poster
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUwCJYSnbBLMEGWKfSnWRGC_34iCCKkxePpg&s";

  const averageRating = +data.Ratings?.reduce(
    (sum, rating) => sum + extractRating(rating.Value) / data.Ratings.length,
    0
  ).toFixed(2);

  const ratedBy = data.Ratings.map((rating) => rating.Source).join(", ");

  const countries = data.Country.includes(",")
    ? `Countries: ${data.Country}`
    : `Country: ${data.Country}`;

  return (
    <div className={styles[`movieDetails--${theme}`]}>
      <ThemeChange />

      <section className={`${styles.movieDetails} `}>
        <div className={styles.container}>
          <div className={styles.poster}>
            <Image
              src={validPoster}
              alt={data.Title}
              className={styles["poster__img"]}
              width={350}
              height={450}
              quality={100}
              priority
            />
          </div>
          <div className={styles.details}>
            <h1 className={`${styles.title} ${styles[`title--${theme}`]}`}>
              {data.Title}
            </h1>
            <p className={`${styles.year} ${styles[`year--${theme}`]}`}>
              {data.Year}
            </p>
            <div className={styles.info}>
              <span className={styles[`info--${theme}`]}>{data.Rated}</span>
              <span className={styles[`info--${theme}`]}>{data.Runtime}</span>
              <span className={styles[`info--${theme}`]}>{data.Genre}</span>
            </div>
            <p className={`${styles.plot} ${styles[`plot--${theme}`]}`}>
              {data.Plot}
            </p>
            <div className={`${styles.credits} ${styles[`credits--${theme}`]}`}>
              <p>
                <strong className={styles[`strong--${theme}`]}>
                  Director:
                </strong>{" "}
                {data.Director}
              </p>
              <p>
                <strong className={styles[`strong--${theme}`]}>Writer:</strong>{" "}
                {data.Writer}
              </p>
              <p>
                <strong className={styles[`strong--${theme}`]}>Actors:</strong>{" "}
                {data.Actors}
              </p>

              {theme === "light" ? (
                <StarRating
                  defaultRating={+averageRating / 2}
                  maxRating={5}
                  color="#f59e0b"
                  disableHoverEffect
                  cursor="default"
                  colorText="#777"
                />
              ) : (
                <StarRating
                  defaultRating={+averageRating / 2}
                  maxRating={5}
                  color="#b38434"
                  disableHoverEffect
                  cursor="default"
                  colorText="#e4dada"
                />
              )}

              <div>Rated by: {ratedBy}</div>
              <div>Awards: {data.Awards}</div>
              <div>{countries}</div>
              <div>Languages: {data.Language}</div>
              <div>
                Released date:{" "}
                <strong className={styles[`strong--${theme}`]}>
                  {data.Released}
                </strong>
              </div>
            </div>
            <Link href="/" className={styles.backLink}>
              <button
                className={`${styles.btn} ${styles[`btn--green--${theme}`]} ${
                  styles["btn--animated"]
                }`}
              >
                Back to our main page
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Multimedia;
