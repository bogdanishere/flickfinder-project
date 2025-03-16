"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchMovieSchema,
  type SearchMovieType,
} from "@/validation/searchMovieValidation";
import { searchMoviesByNameOrType } from "./actions";
import { useMovieListStore } from "@/stores/movieListStore";
import Button from "@/components/Button";
import { useSearchMovieStore } from "@/stores/searchMovieStore";

type SearchMovieFormProps = {
  page: string | number;
};

export default function SearchMovieForm({ page }: SearchMovieFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SearchMovieType>({
    resolver: zodResolver(searchMovieSchema),
  });

  const { searchMovie: movieSearch, setSearchMovie: setMovieSearch } =
    useSearchMovieStore();

  const { setMovieList, setIsSubmitting } = useMovieListStore();

  const onSubmit: SubmitHandler<SearchMovieType> = async (data) => {
    if (data.movie === movieSearch) return;

    setIsSubmitting(true);

    try {
      const data2 = await searchMoviesByNameOrType(data.movie, page);

      if (data2.Response === "True") {
        setMovieList(data2.Search);
      } else if (data2.Response === "False") {
        setMovieList([]);
      }
    } catch {
      setMovieList([]);
      console.error("Something went wrong in the search");
      throw new Error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }

    setMovieSearch(data.movie);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 pt-20 w-[70%] mx-auto"
    >
      <div className="flex flex-col gap-y-4">
        <input
          type="text"
          id="movie"
          placeholder="Search your next movie"
          {...register("movie", { required: true })}
          className="block w-full px-4 py-3 text-lg bg-white/15 border-b-1 border-transparent  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        {errors.movie && (
          <span className="text-sm text-red-600 font-semibold ">
            {errors.movie.message}
          </span>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-[40%]">
        {isSubmitting ? "Searching..." : "Discover new stories"}
      </Button>
    </form>
  );
}
