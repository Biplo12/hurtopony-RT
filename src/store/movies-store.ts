import { create } from "zustand";
import {
  type Movie,
  type SortOption,
  type MovieCategory,
} from "~/interfaces/IMovie";
import { devtools } from "zustand/middleware";

interface MoviesStore {
  movies: Movie[];
  moviesCategories: MovieCategory[];
  selectedCategoryId: number | null;
  sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  };
}

interface MoviesStoreActions {
  setMovies: (movies: Movie[]) => void;
  setMoviesCategories: (moviesCategories: MovieCategory[]) => void;
  setSelectedCategoryId: (selectedCategoryId: number | null) => void;
  setSortOptions: (sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  }) => void;
}

const initialState: MoviesStore = {
  movies: [],
  moviesCategories: [],
  selectedCategoryId: null,
  sortOptions: {
    sortBy: "popularity",
    sortDirection: "DESC",
  },
};

export const moviesStore = create<MoviesStore & MoviesStoreActions>()(
  devtools((set) => ({
    ...initialState,
    setMovies: (movies: Movie[]) => set({ movies }),
    setMoviesCategories: (moviesCategories: MovieCategory[]) =>
      set({ moviesCategories }),
    setSelectedCategoryId: (selectedCategoryId: number | null) =>
      set({ selectedCategoryId }),
    setSortOptions: (sortOptions: {
      sortBy: SortOption;
      sortDirection: "ASC" | "DESC";
    }) => set({ sortOptions }),
  })),
);
