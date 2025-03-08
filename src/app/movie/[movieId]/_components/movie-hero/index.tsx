/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import MoviePoster from "./partials/movie-poster";
import MovieInfo from "./partials/movie-info";
import { MOVIE_DB_BACKDROP_PATH } from "~/constants/";
import MoviePlaceholder from "./partials/movie-placeholder";

interface MovieHeroProps {
  movie: Movie;
}

const MovieHero: React.FC<MovieHeroProps> = ({ movie }) => {
  if (!movie) return null;

  return (
    <div className="relative h-[60vh] w-full overflow-hidden sm:h-[65vh] md:h-[70vh] lg:h-[75vh]">
      {movie.backdrop_path && (
        <img
          src={`${MOVIE_DB_BACKDROP_PATH}${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-500"
        />
      )}

      {!movie.backdrop_path && (
        <MoviePlaceholder title="No backdrop available" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col px-4 pb-6 md:container sm:pb-10 md:mx-auto md:flex-row md:items-end md:gap-8 md:px-6 md:pb-12">
        <MoviePoster movie={movie} />
        <MovieInfo movie={movie} />
      </div>
    </div>
  );
};

export default MovieHero;
