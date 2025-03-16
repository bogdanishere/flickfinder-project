"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import { useMovieListStore } from "@/stores/movieListStore";
import { searchMoviesByNameOrType } from "./actions";
import { useSearchMovieStore } from "@/stores/searchMovieStore";

export function Pagination({ page }: { page: number }) {
  const router = useRouter();
  const { setMovieList, setIsSubmitting } = useMovieListStore();
  const { searchMovie } = useSearchMovieStore();

  async function handlePrevious() {
    if (page <= 1) return;

    try {
      setIsSubmitting(true);
      const data = await searchMoviesByNameOrType(searchMovie, page - 1);
      if (data.Response === "True") {
        setMovieList(data.Search);
      } else {
        setMovieList([]);
      }
    } catch {
      throw new Error("Error pagination fetching data");
    } finally {
      setIsSubmitting(false);
    }

    router.replace(`/${page - 1}`);
  }

  async function handleNext() {
    try {
      setIsSubmitting(true);
      const data = await searchMoviesByNameOrType(searchMovie, page + 1);
      if (data.Response === "True") {
        setMovieList(data.Search);
      } else {
        setMovieList([]);
      }
    } catch {
      throw new Error("Error pagination fetching data");
    } finally {
      setIsSubmitting(false);
    }

    router.replace(`/${page + 1}`);
  }

  return (
    <div className="flex items-center justify-center gap-6 mx-auto py-4 lg:w-[50%]">
      <Button
        onClick={handlePrevious}
        className={`px-4 py-2 ${
          page <= 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 transition-transform"
        }`}
      >
        Previous
      </Button>

      <span className="flex items-center justify-center h-10 w-10">{page}</span>

      <Button
        onClick={handleNext}
        className="px-4 py-2 hover:scale-105 transition-transform"
      >
        Next
      </Button>
    </div>
  );
}
