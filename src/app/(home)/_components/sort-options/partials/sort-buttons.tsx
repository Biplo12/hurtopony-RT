import React from "react";
import { cn } from "~/lib/utils";
import { moviesStore } from "~/store/movies-store";
import { type SortOption } from "~/interfaces/IMovie";

interface ISortOptionsMap {
  label: string;
  value: SortOption;
  shortLabel: string;
}

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
    shortLabel: "Release",
  },
  {
    label: "Title",
    value: "title",
  },
] as ISortOptionsMap[];

const SortButtons: React.FC = () => {
  const { sortOptions, setSortOptions } = moviesStore((state) => state);

  const handleSort = (option: SortOption) => {
    setSortOptions({
      sortBy: option,
      sortDirection: "DESC",
    });
  };

  return (
    <div className="flex flex-wrap overflow-hidden rounded-lg border border-white/5">
      {sortOptionsMap.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSort(option.value)}
          className={cn(
            "min-w-[60px] whitespace-nowrap px-2 py-1.5 text-[12px] transition-colors md:px-3 md:text-xs",
            sortOptions.sortBy === option.value
              ? "bg-accent text-accent-foreground"
              : "bg-secondary hover:bg-secondary/80",
          )}
        >
          <span className="hidden md:inline">{option.label}</span>
          <span className="md:hidden">{option.shortLabel ?? option.label}</span>
        </button>
      ))}
    </div>
  );
};

export default SortButtons;
