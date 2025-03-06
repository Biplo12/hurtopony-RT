import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import { Star, Clock, Calendar } from "lucide-react";
import { formatRuntime, formatDate } from "~/lib/formatters";

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
    <div className="w-full animate-fade-in md:w-auto md:pb-8">
      <h1 className="text-balance text-center text-2xl font-bold tracking-tight md:text-left md:text-4xl">
        {movie.title}
      </h1>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 text-yellow-500" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          <span>{formatRuntime(movie.runtime)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(movie.release_date)}</span>
        </div>
      </div>

      {/* Genres */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className="rounded-full bg-secondary/50 px-3 py-1 text-xs"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MovieInfo;
