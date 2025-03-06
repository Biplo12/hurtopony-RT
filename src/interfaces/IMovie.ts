export type MovieCategory = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
};

export type SortOption =
  | "popularity"
  | "vote_average"
  | "release_date"
  | "title";
