"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import useSearchMoviesByName from "../_hooks/useSearchMoviesByName";
import { getLocalStorageItem } from "@/utils/getLocalStorageItem";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

interface MovieContextType {
  searchMovies: (name: string) => void;
  movies: Movie[];
  isLoading: boolean;
  isError: boolean;
}

export const MovieContext = createContext<MovieContextType | undefined>(
  undefined
);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [query, setQuery] = useState<string>(
    () => getLocalStorageItem("movieQuery") || ""
  );
  const [movies, setMovies] = useState<Movie[]>(() =>
    JSON.parse(getLocalStorageItem("movies") || "[]")
  );

  const {
    moviesByName,
    isLoadingMoviesByName,
    isErrorMoviesByName,
    refetchMoviesByName,
  } = useSearchMoviesByName(query);

  const searchMovies = (name: string) => {
    setQuery(name);
    localStorage.setItem("movieQuery", name);
    refetchMoviesByName();
  };

  useEffect(() => {
    if (moviesByName?.Search) {
      setMovies(moviesByName.Search);
      localStorage.setItem("movies", JSON.stringify(moviesByName.Search));
    }
  }, [moviesByName]);

  return (
    <MovieContext.Provider
      value={{
        searchMovies,
        movies,
        isLoading: isLoadingMoviesByName,
        isError: isErrorMoviesByName,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
