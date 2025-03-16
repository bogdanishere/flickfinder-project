"use client";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
// import { useMovieListStore } from "@/stores/movieListStore";
import Image from "next/image";
import Link from "next/link";

import defaultImage from "@/public/not-found-image.jpg";
import { useEffect, useState } from "react";
import { searchMoviesByNameOrType } from "./actions";
import { useSearchMovieStore } from "@/stores/searchMovieStore";
import type { MovieList } from "@/types";

type MovieListProps = {
  page: number;
};

export default function MovieList({ page }: MovieListProps) {
  const [movies, setMovies] = useState<MovieList | []>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { searchMovie } = useSearchMovieStore();

  async function fetchMovies(searchMovie: string = "", page: number = 1) {
    try {
      setIsSubmitting(true);
      const data = await searchMoviesByNameOrType(searchMovie, page);
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch {
      throw new Error("Error fetching data");
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    fetchMovies(searchMovie, page);
  }, [searchMovie, page]);

  // i should use react query ffs to avoid this

  return (
    <div>
      {isSubmitting && <Spinner />}
      {movies.length > 0 && !isSubmitting && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 p-8 transition-all duration-300">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="card">
              <div className="card__side card__side--front">
                <Image
                  className="w-[95%] h-[95%] object-cover object-center"
                  width={200}
                  height={300}
                  src={movie.Poster === "N/A" ? defaultImage : movie.Poster}
                  alt={`Poster for ${movie.Title}`}
                />
              </div>

              <div className="card__side card__side--back custom-bg">
                <div className="flex flex-col items-center justify-around h-full w-full p-6 text-center">
                  <div className="flex flex-col items-center mt-6">
                    <h2 className="text-2xl font-bold mb-8">{movie.Title}</h2>
                    <div className="space-y-3">
                      <p className="text-lg">Year: {movie.Year}</p>
                      <p className="text-lg">Category: {movie.Type}</p>
                    </div>
                  </div>
                  <Link href={`/multimedia/${movie.imdbID}`} className="mb-6">
                    <Button>More Info</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {movies.length === 0 && !isSubmitting && (
        <div className="text-center ">
          <p className="pb-20 heading-secondary">
            The movies you&apos;re looking for on this page could not be found.
            Please try a different search.
          </p>
        </div>
      )}
    </div>
  );
}
