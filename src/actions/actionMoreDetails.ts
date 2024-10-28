"use server";

import { searchMovieById } from "@/network/api/movies";

export const requestMoreDetailsActions = async (id: string) => {
  const res = await searchMovieById(id);

  return res;
};
