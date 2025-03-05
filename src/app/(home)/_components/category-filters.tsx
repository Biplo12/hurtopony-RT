"use client";

import React, { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMoviesCategories } from "~/hooks/movies/get-movies-categories";
import { cn } from "~/lib/utils";

const CategoryFilters: React.FC = () => {
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const { data: moviesCategories, isLoading } = useGetMoviesCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "LEFT" | "RIGHT") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const SCROLL_AMOUNT = 200;

      if (direction === "LEFT") {
        current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
      } else {
        current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative my-6 w-full">
      <div className="absolute bottom-0 left-0 top-0 z-10 flex items-center">
        <button
          onClick={() => scroll("LEFT")}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-background/80 text-white/70 shadow-md backdrop-blur-sm transition-colors hover:text-white"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-none flex space-x-2 overflow-x-auto px-10 py-2"
      >
        {isLoading && (
          <>
            {Array.from({ length: 16 }).map((_, index) => (
              <div
                key={index}
                className="h-8 w-24 animate-pulse rounded-full bg-secondary/30"
              />
            ))}
          </>
        )}

        {!isLoading && (
          <>
            <button
              onClick={() => setSelectedGenreId(null)}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all",
                selectedGenreId === null
                  ? "shadow-glow bg-accent font-medium text-accent-foreground"
                  : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              All Movies
            </button>

            {moviesCategories?.map((genre) => (
              <button
                key={genre.id}
                onClick={() => setSelectedGenreId(genre.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all",
                  selectedGenreId === genre.id
                    ? "shadow-glow bg-accent font-medium text-accent-foreground"
                    : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
                )}
              >
                {genre.name}
              </button>
            ))}
          </>
        )}
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-10 flex items-center">
        <button
          onClick={() => scroll("RIGHT")}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/5 bg-background/80 text-white/70 shadow-md backdrop-blur-sm transition-colors hover:text-white"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default CategoryFilters;
