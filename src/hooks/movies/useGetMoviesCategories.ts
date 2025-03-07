import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type MovieCategory } from "~/interfaces/IMovie";
import { moviesStore } from "~/store/movies-store";

interface GetMoviesCategoriesResponse {
  genres: MovieCategory[];
}

export const getMoviesCategories = async (): Promise<MovieCategory[]> => {
  try {
    const { setMoviesCategories } = moviesStore.getState();

    const response = await axios.get<GetMoviesCategoriesResponse>(
      `/api/movies/categories`,
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies categories");
    }

    setMoviesCategories(response.data.genres);
    return response.data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

/**
 * Fetches the movies categories from the API.
 * @returns The movies categories.
 */
export const useGetMoviesCategories = () => {
  return useQuery({
    queryKey: ["movies-categories"],
    queryFn: getMoviesCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
