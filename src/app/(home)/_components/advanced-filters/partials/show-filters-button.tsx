import { Button } from "~/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";
import { moviesStore } from "~/store/movies-store";
import { hasActiveFilters } from "~/lib/utils";

interface ShowFiltersButtonProps {
  setShowAdvancedFilters: (show: boolean) => void;
  showAdvancedFilters: boolean;
  isParamsLoading?: boolean;
}

const ShowFiltersButton: React.FC<ShowFiltersButtonProps> = ({
  setShowAdvancedFilters,
  showAdvancedFilters,
  isParamsLoading = false,
}) => {
  const advancedFilters = moviesStore((state) => state.advancedFilters);

  const activeFilters = hasActiveFilters(advancedFilters);

  if (isParamsLoading)
    return <Skeleton className="h-9 w-full rounded-md sm:w-36" />;

  return (
    <div className="relative">
      {activeFilters && (
        <div className="absolute -right-1 -top-1 z-10 h-3 w-3 rounded-full bg-accent" />
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="w-full justify-center gap-2 sm:w-auto"
      >
        <SlidersHorizontal className="h-4 w-4" />
        <span>{showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}</span>
      </Button>
    </div>
  );
};

export default ShowFiltersButton;
