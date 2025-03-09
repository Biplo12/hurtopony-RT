import React, { useEffect, useState } from "react";
import FilterActions from "./partials/filters-actions";
import RatingFilter from "./partials/rating-filter";
import ReleaseYearFilter from "./partials/release-year-filter";
import RuntimeFilter from "./partials/runtime-filter";
import { moviesStore } from "~/store/movies-store";

const AdvancedFilters = () => {
  const { setAdvancedFilters, advancedFilters } = moviesStore((state) => state);

  const [filters, setFilters] = useState<{
    runtime: { min: number; max: number };
    releaseDate: { min: string; max: string };
    rating: { min: number; max: number };
  }>({
    runtime: { min: 0, max: 0 },
    releaseDate: { min: "", max: "" },
    rating: { min: 0, max: 0 },
  });

  useEffect(() => {
    setFilters({
      runtime: {
        min: advancedFilters.runtime.min,
        max: advancedFilters.runtime.max,
      },
      releaseDate: {
        min: advancedFilters.releaseDate.min,
        max: advancedFilters.releaseDate.max,
      },
      rating: {
        min: advancedFilters.rating.min,
        max: advancedFilters.rating.max,
      },
    });
  }, [advancedFilters]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setAdvancedFilters(filters);
  };

  return (
    <div className="mb-6 animate-fade-in rounded-xl border border-border/40 bg-card/30 p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <RuntimeFilter filters={filters} setFilters={setFilters} />
          <ReleaseYearFilter filters={filters} setFilters={setFilters} />
          <RatingFilter filters={filters} setFilters={setFilters} />
        </div>

        <FilterActions filters={filters} setFilters={setFilters} />
      </form>
    </div>
  );
};

export default AdvancedFilters;
