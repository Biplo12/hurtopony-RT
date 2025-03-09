import React from "react";
import { type MovieCategory } from "~/interfaces/IMovie";
import { cn } from "~/lib/utils";
import { moviesStore } from "~/store/movies-store";
interface CategoryButtonsProps {
  categories: Array<MovieCategory> | undefined;
  isLoading: boolean;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  categories,
  isLoading,
}) => {
  if (isLoading) return null;

  const { selectedCategoryId, setSelectedCategoryId } = moviesStore(
    (state) => state,
  );

  return (
    <>
      <button
        onClick={() => setSelectedCategoryId(null)}
        disabled={selectedCategoryId === null || isLoading}
        className={cn(
          "whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all",
          selectedCategoryId === null
            ? "shadow-glow bg-accent font-medium text-accent-foreground"
            : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
        )}
      >
        All Movies
      </button>

      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategoryId(category.id)}
          disabled={isLoading}
          className={cn(
            "whitespace-nowrap rounded-full px-4 py-1.5 text-sm transition-all",
            selectedCategoryId === category.id
              ? "shadow-glow bg-accent font-medium text-accent-foreground"
              : "bg-secondary/50 text-foreground/70 hover:bg-secondary hover:text-foreground",
          )}
        >
          {category.name}
        </button>
      ))}
    </>
  );
};

export default CategoryButtons;
