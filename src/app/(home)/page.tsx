"use client";

import { useState } from "react";
import CategoryFilters from "./_components/category-filters";

export default function HomePage() {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20 text-foreground">
      <main className="container mx-auto px-4 pb-12 pt-24">
        <div className="animate-slide-in mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            Discover Movies
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore the world of cinema with our curated collection of films
          </p>
        </div>
        <CategoryFilters
          selectedGenreId={selectedGenreId}
          onSelectGenre={setSelectedGenreId}
        />
      </main>
    </div>
  );
}
