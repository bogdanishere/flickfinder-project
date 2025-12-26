"use client";

import Button from "@/components/Button";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import Link from "next/link";

import defaultImage from "@/public/not-found-image.jpg";
import { searchMoviesByNameOrType } from "./actions";
import { useSearchMovieStore } from "@/stores/searchMovieStore";
import type { MovieList } from "@/types";
import { useMovieIsLoading } from "@/stores/movieIsLoading";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type MovieListProps = {
  page: number;
};

export default function MovieList({ page }: MovieListProps) {
  const { searchMovie } = useSearchMovieStore();
  const { isSubmitting, setIsSubmitting } = useMovieIsLoading();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const { data: movies } = useQuery({
    queryKey: ["movies", searchMovie, page],
    queryFn: async () => {
      try {
        setIsSubmitting(true);
        const data = await searchMoviesByNameOrType(searchMovie, page);
        if (data.Response === "True") {
          return data.Search;
        } else {
          return [];
        }
      } catch {
        throw new Error("Error fetching data");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!movies) return <Spinner />;

  return (
    <div>
      {isSubmitting && <Spinner />}
      {movies.length > 0 && !isSubmitting && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8 md:p-4 p-2 transition-all duration-300">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="card">
              <div className="card__side card__side--front ">
                <Image
                  className="w-[95%] h-[95%] object-cover object-center"
                  width={200}
                  height={300}
                  src={
                    movie.Poster === "N/A" || imageErrors[movie.imdbID]
                      ? defaultImage
                      : movie.Poster
                  }
                  alt={`Poster for ${movie.Title}`}
                  priority
                  onError={() => {
                    setImageErrors((prev) => ({
                      ...prev,
                      [movie.imdbID]: true,
                    }));
                  }}
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
                  <Link
                    href={`/multimedia/${movie.imdbID}`}
                    className="mb-6"
                    prefetch={false}
                  >
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
