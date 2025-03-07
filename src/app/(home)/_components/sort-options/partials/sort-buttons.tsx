import React from "react";
import { cn } from "~/lib/utils";
import { moviesStore } from "~/store/movies-store";
import { type SortOption } from "~/interfaces/IMovie";

const SortButtons: React.FC = () => {
  const { sortOptions, setSortOptions } = moviesStore((state) => state);

  const sortOptionsMap = [
    {
      label: "Popularity",
      value: "popularity",
    },
    {
      label: "Rating",
      value: "vote_average",
    },
    {
      label: "Release Date",
      value: "release_date",
    },
    {
      label: "Title",
      value: "title",
    },
  ];

  const handleSort = (option: SortOption) => {
    setSortOptions({
      sortBy: option,
      sortDirection: "DESC",
    });
  };

  return (
    <div className="flex overflow-hidden rounded-lg border border-white/5">
      {sortOptionsMap.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSort(option.value as SortOption)}
          className={cn(
            "px-3 py-1.5 text-xs transition-colors",
            sortOptions.sortBy === option.value
              ? "bg-accent text-accent-foreground"
              : "bg-secondary hover:bg-secondary/80",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
