import { useEffect, useState } from "react";
import { moviesStore } from "~/store/movies-store";
import { parse } from "qs";
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
  const {
    searchQuery,
    sortOptions,
    selectedCategoryId,
    pagination,
    advancedFilters,
    setSearchQuery,
    setSortOptions,
    setSelectedCategoryId,
    setCurrentPage,
    setAdvancedFilters,
  } = moviesStore((state) => state);

  useEffect(() => {
    setIsLoading(true);

    const {
      q,
      sortBy,
      sortDirection,
      category,
      page,
      "runtime.gte": runtimeGte,
      "runtime.lte": runtimeLte,
      "release_date.gte": releaseDateGte,
      "release_date.lte": releaseDateLte,
      "vote_average.gte": voteAverageGte,
      "vote_average.lte": voteAverageLte,
    } = parse(window.location.search, {
      ignoreQueryPrefix: true,
    });

    if (q) {
      setSearchQuery(q as string);
    }

    if (sortBy && sortDirection) {
      setSortOptions({
        sortBy: sortBy as SortOption,
        sortDirection: sortDirection as "asc" | "desc",
      });
    }

    if (category) {
      setSelectedCategoryId(Number(category));
    }

    const currentPageValue = page ? Number(page) : 1;

    const updatedAdvancedFilters = {
      ...advancedFilters,
      runtime: {
        min: runtimeGte ? Number(runtimeGte) : 0,
        max: runtimeLte ? Number(runtimeLte) : 0,
      },
      releaseDate: {
        min: releaseDateGte ? (releaseDateGte as string) : "",
        max: releaseDateLte ? (releaseDateLte as string) : "",
      },
      rating: {
        min: voteAverageGte ? Number(voteAverageGte) : 0,
        max: voteAverageLte ? Number(voteAverageLte) : 0,
      },
    };

    setAdvancedFilters(updatedAdvancedFilters);

    if (page) {
      setCurrentPage(currentPageValue);
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

    if (pagination.currentPage > 1) {
      url.searchParams.set("page", pagination.currentPage.toString());
    } else {
      url.searchParams.delete("page");
    }

    if (advancedFilters.runtime.min > 0) {
      url.searchParams.set(
        "runtime.gte",
        advancedFilters.runtime.min.toString(),
      );
    } else {
      url.searchParams.delete("runtime.gte");
    }

    if (advancedFilters.runtime.max > 0) {
      url.searchParams.set(
        "runtime.lte",
        advancedFilters.runtime.max.toString(),
      );
    } else {
      url.searchParams.delete("runtime.lte");
    }

    if (advancedFilters.releaseDate.min) {
      url.searchParams.set("release_date.gte", advancedFilters.releaseDate.min);
    } else {
      url.searchParams.delete("release_date.gte");
    }

    if (advancedFilters.releaseDate.max) {
      url.searchParams.set("release_date.lte", advancedFilters.releaseDate.max);
    } else {
      url.searchParams.delete("release_date.lte");
    }

    if (advancedFilters.rating.min > 0) {
      url.searchParams.set(
        "vote_average.gte",
        advancedFilters.rating.min.toString(),
      );
    } else {
      url.searchParams.delete("vote_average.gte");
    }

    if (advancedFilters.rating.max > 0) {
      url.searchParams.set(
        "vote_average.lte",
        advancedFilters.rating.max.toString(),
      );
    } else {
      url.searchParams.delete("vote_average.lte");
    }

    window.history.replaceState({}, "", url);
  }, [
    searchQuery,
    sortOptions,
    selectedCategoryId,
    pagination.currentPage,
    advancedFilters,
    isLoading,
  ]);

  return { isLoading };
};
