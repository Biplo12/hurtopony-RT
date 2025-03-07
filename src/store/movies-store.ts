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
  searchQuery: string;
  sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  };
}

interface MoviesStoreActions {
  setMovies: (movies: Movie[]) => void;
  setMoviesCategories: (moviesCategories: MovieCategory[]) => void;
  setSelectedCategoryId: (selectedCategoryId: number | null) => void;
  setSearchQuery: (query: string) => void;
  setSortOptions: (sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  }) => void;
}

const updateURLParams = (params: Record<string, string | null>) => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(([key, value]) => {
    if (!value || value === "") {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  window.history.pushState({}, "", url);
};

const initialState: MoviesStore = {
  movies: [],
  moviesCategories: [],
  selectedCategoryId: null,
  searchQuery: "",
  sortOptions: {
    sortBy: "POPULARITY",
    sortDirection: "DESC",
  },
};

export const moviesStore = create<MoviesStore & MoviesStoreActions>()(
  devtools((set) => ({
    ...initialState,
    setMovies: (movies: Movie[]) => set({ movies }),
    setMoviesCategories: (moviesCategories: MovieCategory[]) =>
      set({ moviesCategories }),
    setSelectedCategoryId: (selectedCategoryId: number | null) => {
      updateURLParams({
        category: selectedCategoryId?.toString() ?? null,
      });
      set({ selectedCategoryId });
    },
    setSearchQuery: (query: string) => {
      updateURLParams({ q: query });
      set({ searchQuery: query });
    },
    setSortOptions: (sortOptions: {
      sortBy: SortOption;
      sortDirection: "ASC" | "DESC";
    }) => {
      updateURLParams({
        sortBy: sortOptions.sortBy,
        sortDirection: sortOptions.sortDirection,
      });
      set({ sortOptions });
    },
  })),
);
