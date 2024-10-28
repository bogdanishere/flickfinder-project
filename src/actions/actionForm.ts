"use server";

import { searchMoviesByNameOrType } from "@/network/api/movies";

export const requestMoviesActions = async (query: string) => {
  if (!query) return { Search: [] };
  const response = await searchMoviesByNameOrType(query);

  if (response.Error) {
    return { Search: [] };
  }

  return response;
};
