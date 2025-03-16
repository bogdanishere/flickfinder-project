export type Movie = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type MovieList = Movie[];

export type SearchSearchMoviesByNameOrTypeValid = {
  Search: MovieList;
  totalResults: string;
  Response: "True";
};

export type SearchSearchMoviesByNameOrTypeInvalid = {
  Response: "False";
  Error: string;
};

export type SearchMoviesByNameOrType =
  | SearchSearchMoviesByNameOrTypeValid
  | SearchSearchMoviesByNameOrTypeInvalid;

/// searchMovieById

type SearchMovieByIdValid = {
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
  Poster: string | "N/A";
  Ratings: {
    Source: string;
    Value: string;
  }[];
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
  totalSeasons?: string;
};

type SearchMovieByIdInvalid = {
  Response: "False";
  Error: string;
};

export type SearchMovieById = SearchMovieByIdValid | SearchMovieByIdInvalid;
