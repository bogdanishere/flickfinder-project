"use server";

import { SearchMovieById } from "@/types";

const apiKey = process.env.NEXT_SERVER_ACTIONS_API_KEY as string;

const apiUrl = process.env.NEXT_SERVER_ACTIONS_API_URL as string;

export const searchMovieById = async (id: string): Promise<SearchMovieById> => {
  const response = await fetch(`${apiUrl}/?apikey=${apiKey}&i=${id}`);
  const data = await response.json();
  return data;
};
