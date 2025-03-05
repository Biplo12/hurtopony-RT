import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { type MovieCategory } from "~/interfaces/IMovie";

const getMoviesCategories = async (): Promise<MovieCategory[]> => {
  try {
    const response = await axios.get<{ genres: MovieCategory[] }>(
      `${MOVIE_DB_BASE_URL}/genre/movie/list`,
      {
        headers: {
          Authorization: `Bearer ${MOVIE_DB_API_KEY}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch movies categories");
    }

    return response.data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const useGetMoviesCategories = () => {
  return useQuery({
    queryKey: ["movies-categories"],
    queryFn: getMoviesCategories,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
