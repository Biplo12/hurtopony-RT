import React from "react";
import { X, Check } from "lucide-react";
import { moviesStore } from "~/store/movies-store";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const FilterActions: React.FC = () => {
  const { setAdvancedFilters } = moviesStore((state) => state);
  const advancedFilters = moviesStore((state) => state.advancedFilters);
  const hasActiveFilters = Object.values(advancedFilters).some(
    (filter) => filter.min !== 0 || filter.max !== 0,
  );

  const onClearFilters = () => {
    setAdvancedFilters({
      ...advancedFilters,
      runtime: { min: 0, max: 0 },
      releaseDate: { min: 0, max: 0 },
      rating: { min: 0, max: 0 },
    });
  };

  return (
    <div className="mt-8 flex justify-end gap-3">
      <Button
        type="button"
        onClick={onClearFilters}
        variant={hasActiveFilters ? "destructive" : "outline"}
        size="sm"
        className={cn(
          "gap-1.5",
          !hasActiveFilters && "cursor-not-allowed opacity-50",
        )}
        disabled={!hasActiveFilters}
      >
        <X className="h-4 w-4" />
        Clear Filters
      </Button>
      <Button
        type="submit"
        variant="default"
        size="sm"
        className="gap-1.5 shadow-sm"
      >
        <Check className="h-4 w-4" />
        Apply Filters
      </Button>
    </div>
  );
};

export default FilterActions;
