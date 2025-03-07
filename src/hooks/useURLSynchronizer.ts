import { useEffect } from "react";
import { moviesStore } from "~/store/movies-store";

export const useURLSynchronizer = () => {
  const { searchQuery, sortOptions, selectedCategoryId } = moviesStore(
    (state) => state,
  );

  useEffect(() => {
    const url = new URL(window.location.href);

    if (searchQuery) {
      url.searchParams.set("q", searchQuery);
    } else {
      url.searchParams.delete("q");
    }

    if (sortOptions.sortBy) {
      url.searchParams.set("sortBy", sortOptions.sortBy);
      url.searchParams.set("sortDirection", sortOptions.sortDirection);
    } else {
      url.searchParams.delete("sortBy");
      url.searchParams.delete("sortDirection");
    }

    if (selectedCategoryId) {
      url.searchParams.set("category", selectedCategoryId.toString());
    } else {
      url.searchParams.delete("category");
    }

    window.history.replaceState({}, "", url);
  }, [searchQuery, sortOptions, selectedCategoryId]);

  return null;
};
