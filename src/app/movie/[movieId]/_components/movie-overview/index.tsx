"use client";

import React, { useState } from "react";
import { type Movie } from "~/interfaces/IMovie";
import { Info } from "lucide-react";
import { truncateDescription } from "~/lib/formatters";

interface MovieOverviewProps {
  movie: Movie;
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ movie }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="glass-card flex flex-col gap-4 rounded-xl p-6">
      <div className="flex items-center space-x-2">
        <Info className="h-5 w-5 text-accent" />
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>

      <div className="rounded-xl">
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {showFullDescription
            ? movie.overview
            : truncateDescription(movie.overview, 300)}
        </p>

        {!movie.overview && (
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            No overview available for this movie.
          </p>
        )}

        {movie.overview.length > 300 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-2 font-medium text-accent transition-colors hover:text-accent/80"
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
