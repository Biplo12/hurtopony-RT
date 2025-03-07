"use client";

import React from "react";
import MovieCard from "./partials/movie-card";
import { Skeleton } from "~/components/ui/skeleton";
import { moviesStore } from "~/store/movies-store";

const SKELETON_COUNT = 10;

const MoviesGrid: React.FC = () => {
  const isLoading = false;
  const movies = moviesStore((state) => state.movies);

  if (isLoading || !movies) {
    return (
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div key={index} className="overflow-hidden rounded-xl">
            <Skeleton className="skeleton aspect-[2/3]" />
            <div className="space-y-2 p-4">
              <Skeleton className="skeleton h-5 w-3/4" />
              <Skeleton className="skeleton h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (movies?.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h3 className="mb-2 text-xl font-semibold">No movies found</h3>
        <p className="max-w-md text-center text-muted-foreground">
          Try adjusting your search or filter criteria to find what you&apos;re
          looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid animate-fade-in grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
};

export default MoviesGrid;
