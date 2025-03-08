import React from "react";
import { SortAsc, SortDesc } from "lucide-react";
import { moviesStore } from "~/store/movies-store";

const DirectionButton: React.FC = () => {
  const { sortOptions, setSortOptions } = moviesStore((state) => state);

  const handleSortDirection = () => {
    setSortOptions({
      ...sortOptions,
      sortDirection: sortOptions.sortDirection === "asc" ? "desc" : "asc",
    });
  };

  return (
    <button
      onClick={handleSortDirection}
      className="rounded-md border border-white/5 bg-secondary/50 p-1.5 transition-colors hover:bg-secondary"
      aria-label={
        sortOptions.sortDirection === "asc"
          ? "Sort descending"
          : "Sort ascending"
      }
    >
      {sortOptions.sortDirection === "asc" ? (
        <SortAsc className="h-4 w-4" />
      ) : (
        <SortDesc className="h-4 w-4" />
      )}
    </button>
  );
};

export default DirectionButton;
