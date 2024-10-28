import { requestMoviesActions } from "@/actions/actionForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useSearchMoviesByName(name: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["searchMovies", name],
    queryFn: async () => {
      const response = await requestMoviesActions(name);
      return response;
    },
    enabled: Boolean(name),
  });

  const moviesByNameCache = () =>
    queryClient.invalidateQueries({
      queryKey: ["searchMovies"],
    });

  return {
    moviesByName: data,
    isLoadingMoviesByName: isLoading,
    isErrorMoviesByName: isError,
    moviesByNameCache,
    refetchMoviesByName: refetch,
  };
}
