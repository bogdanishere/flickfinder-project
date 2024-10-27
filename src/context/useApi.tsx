import { useContext } from "react";
import { MovieContext } from "./MovieSearchApi";

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovie trebuie utilizat într-un MovieProvider");
  }
  return context;
};
