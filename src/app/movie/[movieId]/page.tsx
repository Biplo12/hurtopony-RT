"use client";

import React from "react";
import MovieHero from "./_components/movie-hero";
import MovieOverview from "./_components/movie-overview";
import { useParams } from "next/navigation";
import { useGetMovieDetails } from "~/hooks/movies/useGetMovieDetails";
import MovieDetailsSkeleton from "./_components/movie-details-skeleton";
import BackArrowButton from "./_components/back-arrow-button";

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
        <div className="flex flex-col items-center justify-center gap-2 py-20 text-center">
          <h3 className="text-xl font-semibold">No movies found</h3>
          <p className="max-w-md text-center text-muted-foreground">
            Try again later or check your internet connection.
          </p>
          <BackArrowButton />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <BackArrowButton />

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
