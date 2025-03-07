import { useEffect, useState } from "react";
import { moviesStore } from "~/store/movies-store";
import { useSearchParams } from "next/navigation";
import { type SortOption } from "~/interfaces/IMovie";

/**
 * This hook synchronizes the URL with the store state.
 * It reads the URL params and updates the store on mount.
 * It also updates the URL from the store state when the store changes.
 *
 * @returns {Object} An object containing the loading state.
 */
export const useURLSynchronizer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const {
    searchQuery,
    sortOptions,
    selectedCategoryId,
    setSearchQuery,
    setSortOptions,
    setSelectedCategoryId,
  } = moviesStore((state) => state);

  useEffect(() => {
    setIsLoading(true);

    const queryParam = searchParams.get("q");
    const sortByParam = searchParams.get("sortBy") as SortOption | null;
    const sortDirectionParam = searchParams.get("sortDirection") as
      | "ASC"
      | "DESC"
      | null;
    const categoryParam = searchParams.get("category");

    if (queryParam) {
      setSearchQuery(queryParam);
    }

    if (sortByParam && sortDirectionParam) {
      setSortOptions({
        sortBy: sortByParam,
        sortDirection: sortDirectionParam,
      });
    }

    if (categoryParam) {
      setSelectedCategoryId(Number(categoryParam));
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // small delay to ensure data has been fetched and prevent flicker

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading) return;

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
  }, [searchQuery, sortOptions, selectedCategoryId, isLoading]);

  return { isLoading };
};
