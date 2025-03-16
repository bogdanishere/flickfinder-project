import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Items = {
  searchMovie: string;
};

type Actions = {
  setSearchMovie: (searchMovie: string) => void;
};

export const useSearchMovieStore = create<Items & Actions>()(
  persist(
    (set) => ({
      searchMovie: "",
      setSearchMovie: (searchMovie) => set({ searchMovie }),
    }),
    {
      name: "searchMovie",
      storage: createJSONStorage<Items & Actions>(() => localStorage),
    }
  )
);
