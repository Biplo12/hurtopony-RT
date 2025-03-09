import { useState } from "react";
import FilterActions from "./partials/filters-actions";
import RatingFilter from "./partials/rating-filter";
import ReleaseYearFilter from "./partials/release-year-filter";
import RuntimeFilter from "./partials/runtime-filter";
import { Button } from "~/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const AdvancedFilters: React.FC = () => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {!showAdvancedFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="max-w-fit gap-2 rounded-xl border border-border/40 bg-card/30 hover:bg-card/50"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showAdvancedFilters ? "Hide Filters" : "Advanced Filters"}
        </Button>
      )}

      {showAdvancedFilters && (
        <div className="mb-6 animate-fade-in rounded-xl border border-border/40 bg-card/30 p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <RuntimeFilter />
              <ReleaseYearFilter />
              <RatingFilter />
            </div>
            <FilterActions />
          </form>
        </div>
      )}
    </>
  );
};

export default AdvancedFilters;
