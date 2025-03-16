"use server";

import type { SearchMoviesByNameOrType } from "@/types";
import { validatePage } from "@/validation/validatePage";

const apiKey = process.env.NEXT_API_KEY;

export const searchMoviesByNameOrType = async (
  query: string,
  page: number | string = 1
): Promise<SearchMoviesByNameOrType> => {
  const validPage = validatePage.parse(String(page));

  if (validPage.page < 1 || Number.isNaN(validPage.page) || !query) {
    return {
      Response: "False",
      Error: "Invalid page or query",
    };
  }

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${validPage.page}`
  );
  const data = await response.json();
  return data;
};
