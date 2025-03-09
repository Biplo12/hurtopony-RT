import { Clock } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import type IFilters from "~/interfaces/IFilters";
interface RuntimeFilterProps {
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
}

const RuntimeFilter: React.FC<RuntimeFilterProps> = ({
  filters,
  setFilters,
}) => {
  const { runtime } = filters;

  return (
    <div className="space-y-3">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Clock className="text-neon-blue h-4 w-4" />
        Runtime (minutes)
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="minRuntime" className="text-xs text-muted-foreground">
            Min
          </Label>
          <Input
            id="minRuntime"
            type="number"
            min="0"
            max="300"
            placeholder="Min"
            value={runtime.min || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                runtime: { ...runtime, min: Number(e.target.value) || 0 },
              })
            }
            className="h-9"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="maxRuntime" className="text-xs text-muted-foreground">
            Max
          </Label>
          <Input
            id="maxRuntime"
            type="number"
            min="0"
            max="300"
            placeholder="Max"
            value={runtime.max || ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                runtime: { ...runtime, max: Number(e.target.value) || 0 },
              })
            }
            className="h-9"
          />
        </div>
      </div>
    </div>
  );
};

export default RuntimeFilter;
