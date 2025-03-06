import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Star,
  Calendar,
  BarChart3,
  Film,
  Users,
  Info,
} from "lucide-react";
import { Movie } from "~/interfaces/IMovie";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackdropLoaded, setIsBackdropLoaded] = useState(false);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Movie not found</h1>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  // Format runtime to hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Format date to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate description for mobile view
  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back button (fixed position) */}
      <Link
        href="/"
        className="fixed left-6 top-6 z-50 rounded-full border border-white/10 bg-background/30 p-2 backdrop-blur-md transition-colors hover:bg-background/50"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* Hero section with backdrop */}
      <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
        {/* Loading skeleton */}
        {!isBackdropLoaded && (
          <div className="loading-skeleton absolute inset-0" />
        )}

        {/* Backdrop image */}
        <img
          src={movie.backdrop_path}
          alt={`${movie.title} backdrop`}
          className={`h-full w-full object-cover ${
            isBackdropLoaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500`}
          onLoad={() => setIsBackdropLoaded(true)}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30"></div>

        {/* Movie info container */}
        <div className="absolute bottom-0 left-0 right-0 mx-auto flex flex-col items-center space-y-6 p-6 md:container md:flex-row md:items-end md:space-x-8 md:space-y-0 md:p-8">
          {/* Movie poster */}
          <div className="neo-card relative w-48 flex-shrink-0 translate-y-12 overflow-hidden rounded-xl shadow-2xl md:w-64 md:translate-y-16">
            {!isPosterLoaded && (
              <div className="loading-skeleton absolute inset-0" />
            )}
            <img
              src={movie.poster_path}
              alt={movie.title}
              className={`h-full w-full object-cover ${
                isPosterLoaded ? "opacity-100" : "opacity-0"
              } transition-opacity duration-500`}
              onLoad={() => setIsPosterLoaded(true)}
            />
          </div>

          {/* Movie info */}
          <div className="w-full animate-fade-in md:w-auto md:pb-8">
            <h1 className="text-balance text-center text-2xl font-bold tracking-tight md:text-left md:text-4xl">
              {movie.title}
            </h1>

            {/* Movie meta info */}
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
        </div>
      </div>

      {/* Enhanced information sections */}
      <div className="container mx-auto px-6 pb-16 pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Overview section - 2/3 width on desktop */}
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center space-x-2">
              <Info className="text-neon-blue h-5 w-5" />
              <h2 className="text-xl font-semibold">Overview</h2>
            </div>
            <div className="glass-card rounded-xl p-6">
              <p className="text-base leading-relaxed md:text-lg">
                {showFullDescription
                  ? movie.overview
                  : truncateDescription(movie.overview, 300)}
              </p>
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

          {/* Movie stats - 1/3 width on desktop */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <BarChart3 className="text-neon-blue h-5 w-5" />
              <h2 className="text-xl font-semibold">Movie Stats</h2>
            </div>
            <div className="glass-card space-y-6 rounded-xl p-6">
              {/* Popularity stat */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Popularity</span>
                  </div>
                  <span className="font-medium">
                    {movie.popularity.toFixed(0)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/50">
                  <div
                    className="from-neon-blue h-2 rounded-full bg-gradient-to-r to-purple-500"
                    style={{
                      width: `${Math.min(movie.popularity / 10, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Rating stat */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  <span className="font-medium">
                    {movie.vote_average.toFixed(1)}/10
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary/50">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-accent"
                    style={{ width: `${movie.vote_average * 10}%` }}
                  ></div>
                </div>
              </div>

              {/* Length info */}
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Runtime</span>
                  </div>
                  <span className="font-medium">
                    {formatRuntime(movie.runtime)}
                  </span>
                </div>
              </div>

              {/* Release info */}
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span className="text-muted-foreground">Released</span>
                  </div>
                  <span className="font-medium">
                    {formatDate(movie.release_date)}
                  </span>
                </div>
              </div>

              {/* Genres summary */}
              <div className="border-t border-white/10 pt-2">
                <div className="flex items-start gap-2">
                  <Film className="mt-1 h-4 w-4 flex-shrink-0 text-accent" />
                  <div>
                    <span className="text-sm text-muted-foreground">
                      Genres
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="rounded-full bg-secondary/70 px-2 py-0.5 text-xs"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
