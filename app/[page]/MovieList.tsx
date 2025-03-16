"use client";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import { useMovieListStore } from "@/stores/movieListStore";
import Image from "next/image";
import Link from "next/link";

import defaultImage from "@/public/not-found-image.jpg";

export default function MovieList() {
  const { movieList: movies, isSubmitting } = useMovieListStore();

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
