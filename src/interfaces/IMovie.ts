export type MovieCategory = {
  id: number;
  name: string;
};

export type SortOption =
  | "popularity"
  | "vote_average"
  | "release_date"
  | "title";

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  popularity: number;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: MovieCategory[];
};
