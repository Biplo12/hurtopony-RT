import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type SortOption, type Movie } from "~/interfaces/IMovie";
import { moviesStore } from "~/store/movies-store";

interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GetMoviesParams {
  searchQuery?: string;
  sortOptions: {
    sortBy: SortOption;
    sortDirection: "asc" | "desc";
  };
  selectedCategoryId?: number | null;
  currentPage?: number;
  advancedFilters?: {
    runtime: {
      min: number;
      max: number;
    };
    releaseDate: {
      min: string;
      max: string;
    };
    rating: {
      min: number;
      max: number;
    };
  };
}

export const getMovies = async (params?: GetMoviesParams): Promise<Movie[]> => {
  try {
    const { setMovies, setPagination } = moviesStore.getState();

    const urlParams = new URLSearchParams();

    if (params) {
      if (params.selectedCategoryId) {
        urlParams.set("with_genres", params.selectedCategoryId.toString());
      }

      if (params.searchQuery) {
        urlParams.set("query", params.searchQuery);
      }

      if (params.sortOptions.sortBy) {
        const sortOrder =
          params.sortOptions.sortDirection === "asc" ? "asc" : "desc";

        urlParams.set("sort_by", `${params.sortOptions.sortBy}.${sortOrder}`);
      }

      if (params.currentPage) {
        urlParams.set("page", params.currentPage.toString());
      }

      if (params.advancedFilters) {
        const { runtime, releaseDate, rating } = params.advancedFilters;

        if (runtime.min > 0) {
          urlParams.set("runtime.gte", runtime.min.toString());
        }

        if (runtime.max > 0) {
          urlParams.set("runtime.lte", runtime.max.toString());
        }

        if (releaseDate.min) {
          urlParams.set("release_date.gte", releaseDate.min);
        }

        if (releaseDate.max) {
          urlParams.set("release_date.lte", releaseDate.max);
        }

        if (rating.min > 0) {
          urlParams.set("vote_average.gte", rating.min.toString());
        }

        if (rating.max > 0) {
          urlParams.set("vote_average.lte", rating.max.toString());
        }
      }
    }

    const response = await axios.get<GetMoviesResponse>(`/api/movies`, {
      params: urlParams,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }

    setPagination({
      currentPage: response.data.page,
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    });

    setMovies(response.data.results);

    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Fetches movies from the API.
 * @param searchQuery - The search query to fetch movies for.
 * @param sortOptions - The sort options to fetch movies for.
 * @param selectedCategoryId - The selected category ID to fetch movies for.
 * @returns The movies
 */
export const useGetMovies = () => {
  const {
    searchQuery,
    sortOptions,
    selectedCategoryId,
    pagination,
    advancedFilters,
  } = moviesStore((state) => state);

  return useQuery({
    queryKey: [
      "movies",
      searchQuery,
      sortOptions,
      selectedCategoryId,
      pagination.currentPage,
      advancedFilters,
    ],
    queryFn: () =>
      getMovies({
        searchQuery,
        sortOptions,
        selectedCategoryId,
        currentPage: pagination.currentPage,
        advancedFilters,
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
