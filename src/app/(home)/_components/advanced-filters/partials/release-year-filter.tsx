import { Calendar } from "lucide-react";
import { extractYear, formatDateString } from "~/lib/formatters";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface ReleaseYearFilterProps {
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

const ReleaseYearFilter: React.FC<ReleaseYearFilterProps> = ({
  filters,
  setFilters,
}) => {
  const { releaseDate } = filters;

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 6 }, (_, i) =>
    (1900 + i).toString(),
  );

  const minYear = releaseDate.min ? extractYear(releaseDate.min) : "any";
  const maxYear = releaseDate.max ? extractYear(releaseDate.max) : "any";

  const handleMinYearChange = (value: string) => {
    setFilters({
      ...filters,
      releaseDate: {
        ...filters.releaseDate,
        min: value === "any" ? "" : formatDateString(value, true),
      },
    });
  };

  const handleMaxYearChange = (value: string) => {
    setFilters({
      ...filters,
      releaseDate: {
        ...filters.releaseDate,
        max: value === "any" ? "" : formatDateString(value, false),
      },
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="mb-2 flex items-center gap-2 text-sm font-medium">
        <Calendar className="text-neon-pink h-4 w-4" />
        Release Year
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="minReleaseDate"
            className="text-xs text-muted-foreground"
          >
            Min Year
          </Label>
          <Select value={minYear} onValueChange={handleMinYearChange}>
            <SelectTrigger id="minReleaseDate" className="h-9">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="any">Any</SelectItem>
              {years.map((year) => (
                <SelectItem key={`min-${year}`} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label
            htmlFor="maxReleaseDate"
            className="text-xs text-muted-foreground"
          >
            Max Year
          </Label>
          <Select value={maxYear} onValueChange={handleMaxYearChange}>
            <SelectTrigger id="maxReleaseDate" className="h-9">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="any">Any</SelectItem>
              {years.map((year) => (
                <SelectItem key={`max-${year}`} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ReleaseYearFilter;
