import React, { useMemo } from "react";
import { X, Check } from "lucide-react";
import { moviesStore } from "~/store/movies-store";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface FilterActionsProps {
  filters: {
    runtime: { min: number; max: number };
    releaseDate: { min: string; max: string };
    rating: { min: number; max: number };
  };
  setFilters: (filters: {
    runtime: { min: number; max: number };
    releaseDate: { min: string; max: string };
    rating: { min: number; max: number };
  }) => void;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  filters,
  setFilters,
}) => {
  const { setAdvancedFilters } = moviesStore((state) => state);
  const advancedFilters = moviesStore((state) => state.advancedFilters);

  const hasActiveFilters = useMemo(() => {
    const mergedFilters = { ...filters, ...advancedFilters };
    return Object.values(mergedFilters).some((filter) => {
      return Object.values(filter).some((value) => value !== 0);
    });
  }, [filters, advancedFilters]);

  const onClearFilters = () => {
    setFilters({
      runtime: { min: 0, max: 0 },
      releaseDate: { min: "", max: "" },
      rating: { min: 0, max: 0 },
    });
    setAdvancedFilters({
      runtime: { min: 0, max: 0 },
      releaseDate: { min: "", max: "" },
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
