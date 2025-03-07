import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Movie } from "~/interfaces/IMovie";
import { moviesStore } from "~/store/movies-store";

interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export type SortOption =
  | "popularity"
  | "release_date"
  | "vote_average"
  | "title";

interface GetMoviesParams {
  selectedCategoryId: number | null;
  searchQuery: string;
  sortOptions: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  };
}

export const getMovies = async (params?: GetMoviesParams): Promise<Movie[]> => {
  try {
    const { setMovies } = moviesStore.getState();

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
          params.sortOptions.sortDirection === "ASC" ? "asc" : "desc";

        urlParams.set("sort_by", `${params.sortOptions.sortBy}.${sortOrder}`);
      }
    }

    const response = await axios.get<GetMoviesResponse>(`/api/movies`, {
      params: urlParams,
    });

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies");
    }

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
  const { searchQuery, sortOptions, selectedCategoryId } = moviesStore(
    (state) => state,
  );

  return useQuery({
    queryKey: ["movies", searchQuery, sortOptions, selectedCategoryId],
    queryFn: () =>
      getMovies({
        searchQuery,
        sortOptions,
        selectedCategoryId,
      }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
