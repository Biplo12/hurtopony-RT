"use client";

import CategoryFilters from "./_components/category-filters";
import SortOptions from "./_components/sort-options";
import MoviesGrid from "./_components/movies-grid";
import { useURLSynchronizer } from "~/hooks/useURLSynchronizer";

export default function HomePage() {
  const { isLoading: isParamsLoading } = useURLSynchronizer();

  return (
    <main className="container mx-auto min-h-[200vh] bg-background px-4 pb-12 pt-24 text-foreground">
      <div className="mb-8 flex animate-slide-in flex-col gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
          Discover Movies
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Explore the world of cinema with our curated collection of films
        </p>
      </div>

      <CategoryFilters isParamsLoading={isParamsLoading} />
      <SortOptions isParamsLoading={isParamsLoading} />
      <MoviesGrid isParamsLoading={isParamsLoading} />
    </main>
  );
}
