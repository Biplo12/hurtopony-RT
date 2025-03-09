import { Star } from "lucide-react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";

interface RatingFilterProps {
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

const RatingFilter: React.FC<RatingFilterProps> = ({ filters, setFilters }) => {
  const { rating } = filters;

  return (
    <div className="space-y-3">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Star className="text-neon-pink h-4 w-4" />
        Rating
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="minRating" className="text-xs text-muted-foreground">
            Min
          </Label>
          <Input
            id="minRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Min"
            value={rating.min || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                rating: {
                  ...filters.rating,
                  min: Number(e.target.value) || 0,
                },
              })
            }
            className="h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="maxRating" className="text-xs text-muted-foreground">
            Max
          </Label>
          <Input
            id="maxRating"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Max"
            value={rating.max || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                rating: {
                  ...filters.rating,
                  max: Number(e.target.value) || 0,
                },
              })
            }
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
