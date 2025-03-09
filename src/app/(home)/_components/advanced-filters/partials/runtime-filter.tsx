import { Clock } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

interface RuntimeFilterProps {
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

const RuntimeFilter: React.FC<RuntimeFilterProps> = ({
  filters,
  setFilters,
}) => {
  const { runtime } = filters;

  return (
    <div className="space-y-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-medium">
        <Clock className="text-neon-blue h-4 w-4" />
        Runtime (minutes)
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="minRuntime"
            className="block text-xs text-muted-foreground"
          >
            Min
          </Label>
          <Input
            id="minRuntime"
            type="number"
            min="0"
            max="300"
            placeholder="Min"
            value={runtime.min}
            onChange={(e) =>
              setFilters({
                ...filters,
                runtime: { ...runtime, min: Number(e.target.value) },
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="maxRuntime"
            className="block text-xs text-muted-foreground"
          >
            Max
          </Label>
          <Input
            id="maxRuntime"
            type="number"
            min="0"
            max="300"
            placeholder="Max"
            value={runtime.max}
            onChange={(e) =>
              setFilters({
                ...filters,
                runtime: { ...runtime, max: Number(e.target.value) },
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
          />
        </div>
      </div>
    </div>
  );
};

export default RuntimeFilter;
