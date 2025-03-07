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
  return (
    <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
      {movie.backdrop_path ? (
        <img
          src={`${MOVIE_DB_BACKDROP_PATH}${movie.backdrop_path}`}
          alt={`${movie.title} backdrop`}
          className="h-full w-full object-cover opacity-100 transition-opacity duration-500"
        />
      ) : (
        <MoviePlaceholder title="No backdrop available" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30"></div>

      <div className="absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center space-y-6 p-6 md:container md:flex-row md:items-end md:space-x-8 md:space-y-0 md:p-8">
        <MoviePoster movie={movie} />
        <MovieInfo movie={movie} />
      </div>
    </div>
  );
};

export default MovieHero;
