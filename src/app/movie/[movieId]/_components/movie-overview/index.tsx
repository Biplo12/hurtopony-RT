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
    <div className="md:col-span-2">
      <div className="mb-4 flex items-center space-x-2">
        <Info className="text-neon-blue h-5 w-5" />
        <h2 className="text-xl font-semibold">Overview</h2>
      </div>
      <div className="glass-card rounded-xl px-2">
        <p className="text-base leading-relaxed md:text-lg">
          {showFullDescription
            ? movie.overview
            : truncateDescription(movie.overview, 300)}
        </p>

        {!movie.overview && (
          <p className="text-base leading-relaxed md:text-lg">
            No overview available for this movie.
          </p>
        )}

        {movie.overview.length > 300 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="hover:text-neon-blue mt-4 font-medium text-accent transition-colors"
          >
            {showFullDescription ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieOverview;
