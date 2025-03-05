import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetMoviesCategories } from "~/hooks/movies/get-movies-categories";
import { cn } from "~/lib/utils";

interface CategoryFilterProps {
  selectedGenreId: number | null;
  onSelectGenre: (genreId: number | null) => void;
}

const CategoryFilters: React.FC<CategoryFilterProps> = ({
  selectedGenreId,
  onSelectGenre,
}) => {
  const { data: moviesCategories } = useGetMoviesCategories();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 200;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative my-6 w-full">
      <div className="absolute bottom-0 left-0 top-0 z-10 flex items-center">
        <button
          onClick={() => scroll("left")}
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
        <button
          onClick={() => onSelectGenre(null)}
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
            onClick={() => onSelectGenre(genre.id)}
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
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-10 flex items-center">
        <button
          onClick={() => scroll("right")}
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
