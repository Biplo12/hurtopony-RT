import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { type Movie } from "~/interfaces/IMovie";
import { moviesStore } from "~/store/movies-store";

interface GetMoviesParams {
  page?: number;
  with_genres?: number;
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
}

interface GetMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = async (): Promise<Movie[]> => {
  try {
    const { selectedCategoryId, sortOptions, setMovies } =
      moviesStore.getState();

    const response = await axios.get<GetMoviesResponse>(
      `${MOVIE_DB_BASE_URL}/discover/movie`,
      {
        params: {
          api_key: MOVIE_DB_API_KEY,
          with_genres: selectedCategoryId,
          sort_by: sortOptions.sortBy,
          include_adult: false,
          include_video: false,
        },
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
  return useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
