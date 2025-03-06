import { create } from "zustand";
import { type Movie, type SortOption } from "~/interfaces/IMovie";
import { devtools } from "zustand/middleware";

interface MoviesStore {
  movies: Movie[];
  selectedCategoryId: number | null;
  sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  };
}

interface MoviesStoreActions {
  setMovies: (movies: Movie[]) => void;
  setSelectedCategoryId: (selectedCategoryId: number | null) => void;
  setSortOptions: (sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  }) => void;
}

const initialState: MoviesStore = {
  movies: [],
  selectedCategoryId: null,
  sortOptions: {
    sortBy: "popularity",
    sortDirection: "ASC",
  },
};

export const moviesStore = create<MoviesStore & MoviesStoreActions>()(
  devtools((set) => ({
    ...initialState,
    setMovies: (movies: Movie[]) => set({ movies }),
    setSelectedCategoryId: (selectedCategoryId: number | null) =>
      set({ selectedCategoryId }),
    setSortOptions: (sortOptions: {
      sortBy: SortOption;
      sortDirection: "ASC" | "DESC";
    }) => set({ sortOptions }),
  })),
);
