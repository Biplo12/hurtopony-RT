"use client";

import React from "react";
import MovieHero from "./_components/movie-hero";
import MovieOverview from "./_components/movie-overview";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetMovieDetails } from "~/hooks/movies/useGetMovieDetails";
import MovieDetailsSkeleton from "./_components/movie-details-skeleton";

const MovieDetails = () => {
  const params = useParams();
  const movieId = params.movieId;

  const { data: movie, isLoading } = useGetMovieDetails(movieId as string);

  if (isLoading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center gap-2 py-20">
            <h3 className="text-xl font-semibold">No movies found</h3>
            <p className="max-w-md text-center text-muted-foreground">
              Try again later or check your internet connection.
            </p>
            <Link
              href="/"
              className="inline-flex items-center space-x-2 text-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Link
        href="/"
        className="fixed left-6 top-20 z-50 rounded-full border border-white/10 bg-background/30 p-2 backdrop-blur-md transition-colors hover:bg-background/50"
        aria-label="Back to home"
      >
        <ArrowLeft className="h-5 w-5" />
      </Link>

      <MovieHero movie={movie} />

      <div className="container mx-auto px-6 pb-16 pt-24 md:pt-32">
        <div className="grid gap-8 md:grid-cols-3">
          <MovieOverview movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
