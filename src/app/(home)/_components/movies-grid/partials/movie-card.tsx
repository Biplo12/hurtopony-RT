"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Movie } from "~/interfaces/IMovie";
import { Eye } from "lucide-react";
import { moviesStore } from "~/store/movies-store";
import { MOVIE_DB_POSTER_PATH } from "~/constants";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { moviesCategories } = moviesStore((state) => state);
  const [imageLoaded, setImageLoaded] = useState(false);

  const releaseYear = new Date(movie.release_date).getFullYear();

  const rating = movie.vote_average.toFixed(1);

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";
    return "bg-red-500";
  };

  const movieGenres = moviesCategories.filter((genre) =>
    movie.genre_ids.includes(genre.id),
  );

  return (
    <div className="group">
      <Link
        href={`/movie/${movie.id}`}
        className="neo-card card-hover relative block h-full overflow-hidden rounded-xl"
      >
        <div className="relative aspect-[2/3]">
          {!imageLoaded && (
            <div className="loading-skeleton absolute inset-0" />
          )}

          <img
            src={`${MOVIE_DB_POSTER_PATH}${movie.poster_path}`}
            alt={movie.title}
            className={`poster-mask h-full w-full object-cover object-center transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <div className="absolute right-2 top-2 z-10">
            <span
              className={`${getRatingColor(parseFloat(rating))} rounded-md px-2 py-1 text-xs font-bold text-white`}
            >
              {rating}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex translate-y-4 transform items-center space-x-2 rounded-full bg-accent/80 px-4 py-2 text-white transition-transform duration-300 group-hover:translate-y-0">
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </span>
          </div>
        </div>

        <div className="p-4">
          <h2 className="mb-1 text-balance text-lg font-semibold leading-tight">
            {movie.title}
          </h2>
          <p className="text-sm text-muted-foreground">{releaseYear}</p>

          <div className="mt-2 flex flex-wrap gap-1">
            {movieGenres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs"
              >
                {genre.name}
              </span>
            ))}
            {movieGenres.length > 2 && (
              <span className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs">
                +{movieGenres.length - 2}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
