import { create } from "zustand";

type Items = {
  isSubmitting: boolean;
};

type Actions = {
  setIsSubmitting: (isSubmitting: boolean) => void;
};

export const useMovieIsLoading = create<Items & Actions>()((set) => ({
  isSubmitting: false,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
}));
