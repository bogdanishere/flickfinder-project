"use server";

import { SearchMovieById } from "@/types";

const apiKey = process.env.NEXT_SERVER_ACTIONS_API_KEY as string;

export const searchMovieById = async (id: string): Promise<SearchMovieById> => {
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&i=${id}`
  );
  const data = await response.json();
  return data;
};
