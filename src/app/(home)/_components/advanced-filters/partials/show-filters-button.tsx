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
  if (isParamsLoading) return <Skeleton className="h-9 w-36 rounded-md" />;

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
      className="gap-2"
    >
      <SlidersHorizontal className="h-4 w-4" />
      {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
    </Button>
  );
};

export default ShowFiltersButton;
