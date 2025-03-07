import React from "react";
import { type Movie } from "~/interfaces/IMovie";
import { Star, Clock, Calendar } from "lucide-react";
import { formatRuntime, formatDate } from "~/lib/formatters";

interface MovieInfoProps {
  movie: Movie;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  if (!movie) return null;

  const movieInfoMap = [
    {
      icon: Star,
      value: movie.vote_average.toFixed(1),
    },
    {
      icon: Clock,
      value: formatRuntime(movie.runtime),
    },
    {
      icon: Calendar,
      value: formatDate(movie.release_date),
    },
  ];

  return (
    <div className="flex w-full animate-fade-in flex-col items-center gap-4 md:w-auto md:pb-8">
      <h1 className="text-balance text-center text-2xl font-bold tracking-tight md:text-left md:text-4xl">
        {movie.title}
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground md:justify-start">
        {movieInfoMap.map((info, index) => (
          <div className="flex items-center gap-1.5" key={index}>
            <info.icon className="h-4 w-4 text-yellow-500" />
            <span>{info.value}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:justify-start">
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
