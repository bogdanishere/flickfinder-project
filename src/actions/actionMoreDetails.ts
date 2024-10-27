"use server";

import { searchMovieById } from "@/network/api/movies";

export const requestMoreDetailsActions = async (id: string) => {
  const res = await searchMovieById(id);
  if (!res || res.Error) {
    throw new Error("Movie not found");
  }
  return res;
};
