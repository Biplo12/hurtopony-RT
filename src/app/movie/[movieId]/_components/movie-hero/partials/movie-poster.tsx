/* eslint-disable @next/next/no-img-element */
import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import { MOVIE_DB_POSTER_PATH } from "~/constants/";
import MoviePlaceholder from "./movie-placeholder";

interface MoviePosterProps {
  movie: Movie;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie }) => {
  return (
    <div className="neo-card relative w-48 flex-shrink-0 translate-y-12 overflow-hidden rounded-xl shadow-2xl md:w-64 md:translate-y-16">
      {movie.poster_path ? (
        <img
          src={`${MOVIE_DB_POSTER_PATH}${movie.poster_path}`}
          alt={movie.title}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-500"
        />
      ) : (
        <MoviePlaceholder
          title="No poster available"
          className="aspect-[2/3]"
        />
      )}
    </div>
  );
};

export default MoviePoster;
