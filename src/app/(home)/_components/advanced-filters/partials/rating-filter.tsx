import { Star } from "lucide-react";
import { moviesStore } from "~/store/movies-store";

const RatingFilter: React.FC = () => {
  const { advancedFilters, setAdvancedFilters } = moviesStore((state) => state);
  const { rating } = advancedFilters;

  return (
    <div className="space-y-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Star className="text-neon-pink h-4 w-4" />
        Rating
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="minRating"
            className="block text-xs text-muted-foreground"
          >
            Min
          </label>
          <input
            id="minRating"
            type="number"
            min="0"
            max="10"
            placeholder="Min"
            value={rating.min}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                rating: {
                  ...advancedFilters.rating,
                  min: Number(e.target.value),
                },
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="maxRating"
            className="block text-xs text-muted-foreground"
          >
            Max
          </label>
          <input
            id="maxRating"
            type="number"
            min="0"
            max="10"
            placeholder="Max"
            value={rating.max}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                rating: {
                  ...advancedFilters.rating,
                  max: Number(e.target.value),
                },
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>
    </div>
  );
};

export default RatingFilter;
