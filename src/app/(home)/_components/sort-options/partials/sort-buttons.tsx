import React from "react";
import { cn } from "~/lib/utils";
import { moviesStore } from "~/store/movies-store";

const SortButtons: React.FC = () => {
  const { sortOptions, setSortOptions } = moviesStore((state) => state);

  return (
    <div className="flex overflow-hidden rounded-lg border border-white/5">
      <button
        onClick={() =>
          setSortOptions({ sortBy: "popularity", sortDirection: "ASC" })
        }
        className={cn(
          "px-3 py-1.5 text-xs transition-colors",
          sortOptions.sortBy === "popularity"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary hover:bg-secondary/80",
        )}
      >
        Popular
      </button>
      <button
        onClick={() =>
          setSortOptions({ sortBy: "vote_average", sortDirection: "ASC" })
        }
        className={cn(
          "px-3 py-1.5 text-xs transition-colors",
          sortOptions.sortBy === "vote_average"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary hover:bg-secondary/80",
        )}
      >
        Rating
      </button>
      <button
        onClick={() =>
          setSortOptions({ sortBy: "release_date", sortDirection: "ASC" })
        }
        className={cn(
          "px-3 py-1.5 text-xs transition-colors",
          sortOptions.sortBy === "release_date"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary hover:bg-secondary/80",
        )}
      >
        Release
      </button>
      <button
        onClick={() =>
          setSortOptions({ sortBy: "title", sortDirection: "ASC" })
        }
        className={cn(
          "px-3 py-1.5 text-xs transition-colors",
          sortOptions.sortBy === "title"
            ? "bg-accent text-accent-foreground"
            : "bg-secondary hover:bg-secondary/80",
        )}
      >
        Title
      </button>
    </div>
  );
};

export default SortButtons;
