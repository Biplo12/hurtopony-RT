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
import { useMemo, useEffect, useRef } from "react";

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
  const initializedRef = useRef(false);

  const currentYear = new Date().getFullYear();

  const yearOptions = useMemo(() => {
    const decades = [];
    const startDecade = 1880;
    const endDecade = Math.floor(currentYear / 10) * 10;

    for (let decade = startDecade; decade <= endDecade; decade += 10) {
      decades.push(decade.toString());
    }

    const recentYears = [];
    for (
      let year = Math.max(endDecade, currentYear - 20);
      year <= currentYear + 5;
      year++
    ) {
      recentYears.push(year.toString());
    }

    return [...new Set([...decades, ...recentYears])].sort(
      (a, b) => parseInt(a) - parseInt(b),
    );
  }, [currentYear]);

  const minYear = releaseDate.min ? extractYear(releaseDate.min) : "any";
  const maxYear = releaseDate.max ? extractYear(releaseDate.max) : "any";

  useEffect(() => {
    if (!initializedRef.current && (minYear !== "any" || maxYear !== "any")) {
      initializedRef.current = true;
      console.log("Initializing with values:", { minYear, maxYear });

      setFilters({
        ...filters,
        releaseDate: {
          min:
            minYear !== "any"
              ? formatDateString(minYear, true)
              : releaseDate.min,
          max:
            maxYear !== "any"
              ? formatDateString(maxYear, false)
              : releaseDate.max,
        },
      });
    }
  }, [filters, setFilters, minYear, maxYear, releaseDate]);

  const displayYearOptions = useMemo(() => {
    const options = [...yearOptions];

    if (minYear !== "any" && !options.includes(minYear)) {
      options.push(minYear);
    }

    if (maxYear !== "any" && !options.includes(maxYear)) {
      options.push(maxYear);
    }

    return options.sort((a, b) => parseInt(a) - parseInt(b));
  }, [yearOptions, minYear, maxYear]);

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
              {displayYearOptions.map((year) => (
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
              {displayYearOptions.map((year) => (
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
