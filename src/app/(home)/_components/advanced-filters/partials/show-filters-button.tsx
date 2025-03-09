import { Button } from "~/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface ShowFiltersButtonProps {
  setShowAdvancedFilters: (show: boolean) => void;
  showAdvancedFilters: boolean;
}

const ShowFiltersButton: React.FC<ShowFiltersButtonProps> = ({
  setShowAdvancedFilters,
  showAdvancedFilters,
}) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
    >
      <SlidersHorizontal className="h-4 w-4" />
      {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
    </Button>
  );
};

export default ShowFiltersButton;
