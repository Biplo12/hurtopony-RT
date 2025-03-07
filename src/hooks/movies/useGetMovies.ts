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
  categoryId: number | null;
  query: string;
  sortBy: SortOption;
  sortDirection: "ASC" | "DESC";
}

export const getMovies = async (params?: GetMoviesParams): Promise<Movie[]> => {
  try {
    const { setMovies } = moviesStore.getState();

    const urlParams = new URLSearchParams();

    if (params) {
      if (params.categoryId) {
        urlParams.set("with_genres", params.categoryId.toString());
      }

      if (params.query) {
        urlParams.set("query", params.query);
      }

      if (params.sortBy) {
        const sortOrder = params.sortDirection === "ASC" ? "asc" : "desc";

        urlParams.set("sort_by", `${params.sortBy}.${sortOrder}`);
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

export const useGetMovies = (params?: GetMoviesParams) => {
  return useQuery({
    queryKey: ["movies", params],
    queryFn: () => getMovies(params),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
