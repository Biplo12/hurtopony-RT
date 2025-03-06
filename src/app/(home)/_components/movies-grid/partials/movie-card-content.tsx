"use client";

import React from "react";
import { type MovieCategory } from "~/interfaces/IMovie";

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
    <div className="p-4">
      <h2 className="mb-1 text-balance text-lg font-semibold leading-tight">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground">{releaseYear}</p>

      <div className="mt-2 flex flex-wrap gap-1">
        {genres.slice(0, 2).map((genre) => (
          <span
            key={genre.id}
            className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs"
          >
            {genre.name}
          </span>
        ))}
        {genres.length > 2 && (
          <span className="inline-block rounded bg-secondary/80 px-2 py-0.5 text-xs">
            +{genres.length - 2}
          </span>
        )}
      </div>
    </div>
  );
};

export default MovieCardContent;
