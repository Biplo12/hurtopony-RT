import FilterActions from "./partials/filters-actions";
import RatingFilter from "./partials/rating-filter";
import ReleaseYearFilter from "./partials/release-year-filter";
import RuntimeFilter from "./partials/runtime-filter";

const AdvancedFilters: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
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
    </>
  );
};

export default AdvancedFilters;
