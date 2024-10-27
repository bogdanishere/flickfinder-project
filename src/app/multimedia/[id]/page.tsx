import { requestMoreDetailsActions } from "@/actions/actionMoreDetails";
import StarRating from "@/_components/StarRating";
import styles from "@/styles/pages/multimedia.module.scss";
import { extractRating } from "@/utils/extragRating";
import Image from "next/image";
import Link from "next/link";

import imageIcon from "@/images/icon-test.png";

interface MovieDetailsProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: MovieDetailsProps) {
  const params = await props.params;
  const { id } = params;
  return {
    title: `Movie ${id}`,
    description: `Details for movie ID ${id}`,
  };
}

export default async function MovieDetails(props: MovieDetailsProps) {
  const params = await props.params;
  const { id } = params;
  const data = await requestMoreDetailsActions(id);

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
    <section className={styles.movieDetails}>
      <Link href="/">
        <div className={styles.icon}>
          <Image src={imageIcon} alt="icon" fill />
        </div>
      </Link>
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
          <h1 className={styles.title}>{data.Title}</h1>
          <p className={styles.year}>{data.Year}</p>
          <div className={styles.info}>
            <span>{data.Rated}</span>
            <span>{data.Runtime}</span>
            <span>{data.Genre}</span>
          </div>
          <p className={styles.plot}>{data.Plot}</p>
          <div className={styles.credits}>
            <p>
              <strong>Director:</strong> {data.Director}
            </p>
            <p>
              <strong>Writer:</strong> {data.Writer}
            </p>
            <p>
              <strong>Actors:</strong> {data.Actors}
            </p>
            <StarRating
              defaultRating={+averageRating / 2}
              maxRating={5}
              color="#f59e0b"
              disableHoverEffect
              cursor="default"
              colorText="#777"
            />
            <div>Rated by: {ratedBy}</div>
            <div>Awards: {data.Awards}</div>
            <div>{countries}</div>
            <div>Languages: {data.Language}</div>
            <div>
              Released date: <strong>{data.Released}</strong>
            </div>
          </div>
          <Link href="/" className={styles.backLink}>
            <button
              className={`${styles.btn} ${styles["btn--green"]} ${styles["btn--animated"]}`}
            >
              Back to our main page
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
