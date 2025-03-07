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
  pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
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
  setPagination: (pagination: {
    currentPage: number;
    totalPages: number;
    totalResults: number;
  }) => void;
  setCurrentPage: (page: number) => void;
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
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
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
        page: null,
      });
      set((state) => ({
        selectedCategoryId,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }));
    },
    setSearchQuery: (query: string) => {
      updateURLParams({
        q: query,
        page: null,
      });
      set((state) => ({
        searchQuery: query,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }));
    },
    setSortOptions: (sortOptions: {
      sortBy: SortOption;
      sortDirection: "ASC" | "DESC";
    }) => {
      updateURLParams({
        sortBy: sortOptions.sortBy,
        sortDirection: sortOptions.sortDirection,
        page: null,
      });
      set((state) => ({
        sortOptions,
        pagination: {
          ...state.pagination,
          currentPage: 1,
        },
      }));
    },
    setPagination: (pagination: {
      currentPage: number;
      totalPages: number;
      totalResults: number;
    }) => {
      set({ pagination });
    },
    setCurrentPage: (page: number) => {
      updateURLParams({
        page: page.toString(),
      });
      set((state) => ({
        pagination: {
          ...state.pagination,
          currentPage: page,
        },
      }));
    },
  })),
);
