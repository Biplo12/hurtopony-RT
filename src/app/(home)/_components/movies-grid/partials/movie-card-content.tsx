"use client";

import React from "react";
import { type MovieCategory } from "~/interfaces/IMovie";

const MAX_GENRES = 2;

interface MovieCardContentProps {
  title: string;
  releaseYear: number;
  genres: MovieCategory[];
}

const MovieCardContent: React.FC<MovieCardContentProps> = ({
  title,
  releaseYear,
  genres,
}) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h2 className="text-balance text-lg font-semibold leading-tight">
        {title}
      </h2>

      <p className="text-sm text-muted-foreground">
        {releaseYear ? releaseYear : "N/A"}
      </p>

      <div className="flex flex-wrap gap-1">
        {genres.slice(0, MAX_GENRES).map((genre) => (
          <span
            key={genre.id}
            className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs"
          >
            {genre.name}
          </span>
        ))}

        {genres.length > MAX_GENRES && (
          <span className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs">
            +{genres.length - MAX_GENRES}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCardContent;
