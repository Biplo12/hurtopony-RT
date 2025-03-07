import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { type Movie } from "~/interfaces/IMovie";

export const getMovieDetails = async (
  movieId: string,
): Promise<Movie | null> => {
  try {
    const response = await axios.get<Movie>(`/api/movies/details`, {
      params: {
        movieId,
      },
    });

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
