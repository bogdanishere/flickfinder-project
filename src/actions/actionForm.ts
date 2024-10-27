"use server";

import { searchMoviesByNameOrType } from "@/network/api/movies";

export const requestMoviesActions = async (query: string) => {
  const response = await searchMoviesByNameOrType(query);

  return response;
};
