import React, { useState } from "react";
import FilterActions from "./partials/filters-actions";
import RatingFilter from "./partials/rating-filter";
import ReleaseYearFilter from "./partials/release-year-filter";
import RuntimeFilter from "./partials/runtime-filter";
import { moviesStore } from "~/store/movies-store";

const AdvancedFilters = () => {
  const { setAdvancedFilters } = moviesStore((state) => state);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdvancedFilters({
      runtime: { min: 0, max: 0 },
      releaseDate: { min: "", max: "" },
      rating: { min: 0, max: 0 },
    });
  };

  const onApplyFilters = () => {
    console.log("onApplyFilters");
  };

  return (
    <div className="mb-6 animate-fade-in rounded-xl border border-border/40 bg-card/30 p-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <RuntimeFilter />
          <ReleaseYearFilter />
          <RatingFilter />
        </div>
        <FilterActions onApplyFilters={onApplyFilters} />
      </form>
    </div>
  );
};

export default AdvancedFilters;
