import { MovieList } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Items = {
  movieList: MovieList;
  isSubmitting: boolean;
};

type Actions = {
  setMovieList: (movieList: MovieList) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export const useMovieListStore = create<Items & Actions>()(
  persist(
    (set) => ({
      movieList: [],
      isSubmitting: false,
      setMovieList: (movieList) => set({ movieList }),
      setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
    }),
    {
      name: "movieList",
      storage: createJSONStorage<Items & Actions>(() => localStorage),
    }
  )
);
