"use server";

import { searchMoviesByNameOrType } from "@/network/api/movies";

export const requestMoviesActions = async (
  query: string,
  page: string | number
) => {
  if (!query) return { Search: [] };
  const response = await searchMoviesByNameOrType(query, page);

  if (response.Error) {
    return { Search: [] };
  }

  return response;
};
