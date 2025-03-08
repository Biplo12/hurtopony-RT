"use client";

import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import MovieCreators from "./movie-creators";
import MovieDescription from "./movie-description";
interface MovieOverviewProps {
  movie: Movie;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ movie }) => {
  return (
    <div className="flex flex-col gap-6 rounded-xl p-6">
      <MovieCreators movie={movie} />
      <MovieDescription movie={movie} />
    </div>
  );
};

export default MovieOverview;
