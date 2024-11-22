import { requestMoviesActions } from "@/actions/actionForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function useSearchMoviesByName(
  name: string,
  page: string | number
) {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["searchMovies", name, page],
    queryFn: async () => {
      const response = await requestMoviesActions(name, page);
      return response;
    },
    enabled: Boolean(name),
  });

  const moviesByNameCache = () =>
    queryClient.invalidateQueries({
      queryKey: ["searchMovies", name, page],
    });

  return {
    moviesByName: data,
    isLoadingMoviesByName: isLoading,
    isErrorMoviesByName: isError,
    moviesByNameCache,
    refetchMoviesByName: refetch,
  };
}
