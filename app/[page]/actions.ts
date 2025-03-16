"use server";

import type { SearchMoviesByNameOrType } from "@/types";

const apiKey = process.env.NEXT_API_KEY;

export const searchMoviesByNameOrType = async (
  query: string,
  page: number | string = 1
): Promise<SearchMoviesByNameOrType> => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`
  );
  const data = await response.json();
  return data;
};
