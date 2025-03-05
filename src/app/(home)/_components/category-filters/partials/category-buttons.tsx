import React from "react";
import { type MovieCategory } from "~/interfaces/IMovie";
import { cn } from "~/lib/utils";

interface CategoryButtonsProps {
  categories: Array<MovieCategory> | undefined;
  selectedGenreId: number | null;
  setSelectedGenreId: (id: number | null) => void;
  isLoading: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  selectedGenreId,
  setSelectedGenreId,
  isLoading,
}) => {
  if (isLoading) return null;

  return (
    <>
      <button
        onClick={() => setSelectedGenreId(null)}
        disabled={selectedGenreId === null || isLoading}
        className={cn(
          "whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all",
          selectedGenreId === null
            ? "shadow-glow bg-accent font-medium text-accent-foreground"
            : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
        )}
      >
        All Movies
      </button>

      {categories?.map((genre) => (
        <button
          key={genre.id}
          onClick={() => setSelectedGenreId(genre.id)}
          disabled={isLoading}
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
  );
};

export default CategoryButtons;
