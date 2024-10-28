"use client";

import { useMovie } from "@/_context/useApi";
import { useTheme } from "@/_hooks/useTheme";
import styles from "@/styles/pages/movieSearchForm.module.scss";

import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  movie: string;
};

function MovieSearchForm() {
  const { searchMovies, isLoading } = useMovie();
  const { theme } = useTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    searchMovies(data.movie);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles["form__group"]}>
        <input
          type="text"
          className={`${styles["form__input"]} ${
            styles[`form__input--${theme}`]
          }`}
          placeholder="Search your next movie"
          id="movie"
          {...register("movie", { required: true })}
        />
        {errors.movie && (
          <span className={styles["form__error-message"]}>
            This field is required
          </span>
        )}
      </div>

      <button
        type="submit"
        className={`${styles.btn} ${styles[`btn--white--${theme}`]} ${
          styles["btn--animated"]
        }`}
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Discover new stories"}
      </button>
    </form>
  );
}

export default MovieSearchForm;
