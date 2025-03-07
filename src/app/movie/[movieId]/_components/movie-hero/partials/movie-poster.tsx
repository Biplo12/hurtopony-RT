/* eslint-disable @next/next/no-img-element */
import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import { MOVIE_DB_POSTER_PATH } from "~/constants/";
import MoviePlaceholder from "./movie-placeholder";

interface MoviePosterProps {
  movie: Movie;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative mx-auto w-36 flex-shrink-0 overflow-hidden rounded-xl shadow-2xl sm:w-44 md:mx-0 md:w-56 lg:w-64">
      {movie.poster_path && (
        <img
          src={`${MOVIE_DB_POSTER_PATH}${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-500"
        />
      )}

      {!movie.poster_path && (
        <MoviePlaceholder
          title="No poster available"
          className="aspect-[2/3]"
        />
      )}
    </div>
  );
};

export default MoviePoster;
