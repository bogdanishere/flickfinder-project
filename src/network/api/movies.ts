import api from "../axiosInstance";

const apiKey = process.env.NEXT_API_KEY;

interface SearchMoviesByNameOrType {
  data: {
    Search: {
      Title: string;
      Year: string;
      imdbID: string;
      Type: string;
      Poster: string;
    }[];
    Error?: string;
  };
}

export const searchMoviesByNameOrType = async (query: string) => {
  const response: SearchMoviesByNameOrType = await api.get(
    `?apikey=${apiKey}&s=${query}`
  );
  return response.data;
};

interface SearchMovieById {
  data: {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
      Source: string;
      Value: string;
    }[];
    Error?: string;
  };
}

export const searchMovieById = async (imdbID: string) => {
  const response: SearchMovieById = await api.get(
    `?apikey=${apiKey}&i=${imdbID}`
  );
  return response.data;
};
