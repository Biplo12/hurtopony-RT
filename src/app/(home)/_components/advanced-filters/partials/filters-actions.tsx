import React from "react";
import { X, Check } from "lucide-react";
import { moviesStore } from "~/store/movies-store";
import { Button } from "~/components/ui/button";
import { cn, hasActiveFilters } from "~/lib/utils";
import type IFilters from "~/interfaces/IFilters";

interface FilterActionsProps {
  setFilters: (filters: IFilters) => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({ setFilters }) => {
  const { setAdvancedFilters } = moviesStore((state) => state);
  const advancedFilters = moviesStore((state) => state.advancedFilters);

  const activeFilters = hasActiveFilters(advancedFilters);

  const emptyFilters = {
    runtime: { min: 0, max: 0 },
    releaseDate: { min: "", max: "" },
    rating: { min: 0, max: 0 },
  };

  const onClearFilters = () => {
    setFilters(emptyFilters);
    setAdvancedFilters(emptyFilters);
  };

  return (
    <div className="mt-6 flex flex-col justify-end gap-2 sm:mt-8 sm:flex-row sm:gap-3">
      <Button
        type="button"
        onClick={onClearFilters}
        variant={activeFilters ? "destructive" : "outline"}
        size="sm"
        className={cn(
          "w-full gap-1.5 sm:w-auto",
          !activeFilters && "cursor-not-allowed opacity-50",
        )}
        disabled={!activeFilters}
      >
        <X className="h-4 w-4" />
        Clear Filters
      </Button>

      <Button
        type="submit"
        variant="default"
        size="sm"
        className="w-full gap-1.5 shadow-sm sm:w-auto"
      >
        <Check className="h-4 w-4" />
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
