import { Button } from "~/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { Skeleton } from "~/components/ui/skeleton";

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
  if (isParamsLoading)
    return <Skeleton className="h-9 w-full rounded-md sm:w-36" />;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      className="w-full justify-center gap-2 sm:w-auto"
    >
      <SlidersHorizontal className="h-4 w-4" />
      <span>{showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}</span>
    </Button>
  );
};

export default ShowFiltersButton;
