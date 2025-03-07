"use client";

import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import MovieCardPoster from "./movie-card-poster";
import MovieCardContent from "./movie-card-content";
import { moviesStore } from "~/store/movies-store";
import Link from "next/link";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { moviesCategories } = moviesStore((state) => state);
  const releaseYear = new Date(movie.release_date).getFullYear();
  const rating = movie.vote_average?.toFixed(1);

  const movieGenres = moviesCategories.filter((genre) =>
    movie.genre_ids?.includes(genre.id),
  );

  return (
    <div className="group">
      <Link
        href={`/movie/${movie.id}`}
        className="neo-card card-hover relative block h-full overflow-hidden rounded-xl"
      >
        <MovieCardPoster
          posterPath={movie.poster_path}
          title={movie.title}
          rating={rating}
        />
        <MovieCardContent
          title={movie.title}
          releaseYear={releaseYear}
          genres={movieGenres}
        />
      </Link>
    </div>
  );
};

export default MovieCard;
