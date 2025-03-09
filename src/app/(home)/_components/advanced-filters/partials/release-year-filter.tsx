import { Calendar } from "lucide-react";
import { moviesStore } from "~/store/movies-store";

const ReleaseYearFilter: React.FC = () => {
  const { advancedFilters, setAdvancedFilters } = moviesStore((state) => state);

  const { releaseDate } = advancedFilters;

  return (
    <div className="space-y-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Calendar className="text-neon-pink h-4 w-4" />
        Release Year
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label
            htmlFor="minReleaseDate"
            className="block text-xs text-muted-foreground"
          >
            Min Year
          </label>
          <input
            id="minReleaseDate"
            type="number"
            min="1900"
            max="2100"
            placeholder="YYYY"
            value={releaseDate.min}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                releaseDate: {
                  ...advancedFilters.releaseDate,
                  min: e.target.value,
                },
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
        <div className="space-y-1.5">
          <label
            htmlFor="maxReleaseDate"
            className="block text-xs text-muted-foreground"
          >
            Max Year
          </label>
          <input
            id="maxReleaseDate"
            type="number"
            min="1900"
            max="2100"
            placeholder="YYYY"
            value={releaseDate.max}
            onChange={(e) =>
              setAdvancedFilters({
                ...advancedFilters,
                releaseDate: {
                  ...advancedFilters.releaseDate,
                  max: e.target.value,
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

export default ReleaseYearFilter;
