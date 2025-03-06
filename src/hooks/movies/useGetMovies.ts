import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { type Movie, type SortOption } from "~/interfaces/IMovie";
import { moviesStore } from "~/store/movies-store";

interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

interface GetMoviesParams {
  selectedCategoryId?: number | null;
  sortOptions?: {
    sortBy: SortOption;
    sortDirection: "ASC" | "DESC";
  } | null;
}

export const getMovies = async ({
  selectedCategoryId,
  sortOptions,
}: GetMoviesParams): Promise<Movie[]> => {
  try {
    const { setMovies } = moviesStore.getState();

    const params = new URLSearchParams();

    if (selectedCategoryId) {
      params.set("with_genres", selectedCategoryId.toString());
    }

    if (sortOptions) {
      params.set("sort_by", sortOptions.sortBy);
      params.set("sort_direction", sortOptions.sortDirection);
    }

    params.set("include_adult", "false");
    params.set("api_key", MOVIE_DB_API_KEY);

    console.log(params.toString());

    const response = await axios.get<GetMoviesResponse>(
      `${MOVIE_DB_BASE_URL}/discover/movie`,
      {
        params,
      },
    );

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

export const useGetMovies = () => {
  const selectedCategoryId = moviesStore((state) => state.selectedCategoryId);
  const sortOptions = moviesStore((state) => state.sortOptions);

  return useQuery({
    queryKey: ["movies", selectedCategoryId, sortOptions],
    queryFn: () => getMovies({ selectedCategoryId, sortOptions }),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
