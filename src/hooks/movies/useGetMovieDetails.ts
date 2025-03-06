import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MOVIE_DB_API_KEY } from "~/constants/env";
import { MOVIE_DB_BASE_URL } from "~/constants/request";
import { Movie } from "~/interfaces/IMovie";

export const getMovieDetails = async (
  movieId: string,
): Promise<Movie | null> => {
  try {
    const response = await axios.get<Movie>(
      `${MOVIE_DB_BASE_URL}/movie/${movieId}`,
      {
        params: {
          api_key: MOVIE_DB_API_KEY,
        },
      },
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch movie details");
    }

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const useGetMovieDetails = (movieId: string) => {
  return useQuery({
    queryKey: ["movie-details", movieId],
    queryFn: () => getMovieDetails(movieId),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  });
};
