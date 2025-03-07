"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import ScrollButton from "./partials/scroll-button";
import CategorySkeleton from "./partials/category-skeleton";
import CategoryButtons from "./partials/category-buttons";
import { useGetMoviesCategories } from "~/hooks/movies/useGetMoviesCategories";
import { moviesStore } from "~/store/movies-store";

interface CategoryFiltersProps {
  isParamsLoading?: boolean;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  isParamsLoading = false,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { setSelectedCategoryId } = moviesStore((state) => state);

  const { data: moviesCategories, isLoading: isCategoriesLoading } =
    useGetMoviesCategories();

  const isLoading = isCategoriesLoading || isParamsLoading;

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategoryId(Number(category));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScrollDirection = (direction: "LEFT" | "RIGHT") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const SCROLL_AMOUNT = 200;

      if (direction === "LEFT") {
        current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
      } else {
        current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      }
    }
  };

  return (
    <div className="relative my-6 w-full">
      <div className="absolute bottom-0 left-0 top-0 z-10 flex items-center">
        <ScrollButton
          direction="LEFT"
          onClick={() => handleScrollDirection("LEFT")}
        />
      </div>

      <div
        ref={scrollRef}
        className="scrollbar-none flex space-x-2 overflow-x-auto px-10 py-3"
      >
        {isLoading && <CategorySkeleton />}

        {!isLoading && (
          <CategoryButtons
            categories={moviesCategories}
            isLoading={isLoading}
          />
        )}
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-10 flex items-center">
        <ScrollButton
          direction="RIGHT"
          onClick={() => handleScrollDirection("RIGHT")}
        />
      </div>
    </div>
  );
};

export default CategoryFilters;
