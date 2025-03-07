"use client";

import React from "react";
import MovieCard from "./partials/movie-card";
import { useGetMovies } from "~/hooks/movies/useGetMovies";
import MovieCardSkeleton from "./partials/movie-card-skeleton";
import PaginationControls from "~/components/pagination-controls";
import { moviesStore } from "~/store/movies-store";

interface MoviesGridProps {
  isParamsLoading?: boolean;
}

const MoviesGrid: React.FC<MoviesGridProps> = ({ isParamsLoading = false }) => {
  const { data: movies, isLoading: isMoviesLoading } = useGetMovies();
  const { pagination } = moviesStore((state) => state);

  const isLoading = isMoviesLoading || isParamsLoading;

  if (isLoading || !movies) {
    return <MovieCardSkeleton />;
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
    <div className="flex flex-col space-y-8">
      <div className="xs:grid-cols-2 grid animate-fade-in grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>

      {pagination.totalPages > 1 && <PaginationControls />}
    </div>
  );
};

export default MoviesGrid;
