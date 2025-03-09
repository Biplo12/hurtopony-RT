import React, { useEffect, useState } from "react";
import FilterActions from "./partials/filters-actions";
import RatingFilter from "./partials/rating-filter";
import ReleaseYearFilter from "./partials/release-year-filter";
import RuntimeFilter from "./partials/runtime-filter";
import { moviesStore } from "~/store/movies-store";
import type IFilters from "~/interfaces/IFilters";

const AdvancedFilters: React.FC = () => {
  const { setAdvancedFilters, advancedFilters } = moviesStore((state) => state);

  const [filters, setFilters] = useState<IFilters>({
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
    <div className="mb-6 animate-fade-in rounded-xl border border-border/40 bg-card/30 p-4 sm:p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3">
          <RuntimeFilter filters={filters} setFilters={setFilters} />
          <ReleaseYearFilter filters={filters} setFilters={setFilters} />
          <RatingFilter filters={filters} setFilters={setFilters} />
        </div>

        <FilterActions setFilters={setFilters} />
      </form>
    </div>
  );
};

export default AdvancedFilters;
