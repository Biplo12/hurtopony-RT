/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import { Eye } from "lucide-react";
import { MOVIE_DB_POSTER_PATH } from "~/constants";
import { cn } from "~/lib/utils";
import MoviePlaceholder from "~/app/movie/[movieId]/_components/movie-hero/partials/movie-placeholder";
interface MovieCardPosterProps {
  posterPath: string;
  title: string;
  rating: string;
}

const MovieCardPoster: React.FC<MovieCardPosterProps> = ({
  posterPath,
  title,
  rating,
}) => {
  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-yellow-500";

    return "bg-red-500";
  };

  return (
    <div className="relative aspect-[2/3]">
      {posterPath && (
        <img
          src={`${MOVIE_DB_POSTER_PATH}${posterPath}`}
          alt={title}
          loading="eager"
          className="poster-mask h-full w-full object-cover object-center transition-opacity duration-500"
        />
      )}

      {!posterPath && <MoviePlaceholder title="No poster available" />}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute right-2 top-2 z-10">
        <span
          className={cn(
            getRatingColor(parseFloat(rating)),
            "rounded-md px-2 py-1 text-xs font-bold text-white",
          )}
        >
          {rating || "N/A"}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span className="flex translate-y-4 transform items-center space-x-2 rounded-full bg-accent/80 px-4 py-2 text-white transition-transform duration-300 group-hover:translate-y-0">
          <Eye className="h-4 w-4" />
          <span>View Details</span>
        </span>
      </div>
    </div>
  );
};

export default MovieCardPoster;
