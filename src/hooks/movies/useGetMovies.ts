import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
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
  categoryId: number | null;
  query: string;
  sortBy: SortOption;
  sortDirection: "ASC" | "DESC";
}

export const getMovies = async (params?: GetMoviesParams): Promise<Movie[]> => {
  try {
    const { setMovies } = moviesStore.getState();

    const urlParams = new URLSearchParams();

    urlParams.set("api_key", MOVIE_DB_API_KEY);

    if (params) {
      if (params.categoryId) {
        urlParams.set("with_genres", params.categoryId.toString());
      }

      if (params.query) {
        urlParams.set("query", params.query);
      }

      if (params.sortBy) {
        // MovieDB expects sort_by as parameter with order appended
        const sortOrder = params.sortDirection === "ASC" ? "asc" : "desc";
        urlParams.set("sort_by", `${params.sortBy}.${sortOrder}`);
      }
    }

    const endpoint = params?.query
      ? `${MOVIE_DB_BASE_URL}/search/movie`
      : `${MOVIE_DB_BASE_URL}/discover/movie`;

    const response = await axios.get<GetMoviesResponse>(endpoint, {
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

export const useGetMovies = (params?: GetMoviesParams) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
