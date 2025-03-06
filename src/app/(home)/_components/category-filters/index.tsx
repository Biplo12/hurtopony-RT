"use client";

import React, { useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import ScrollButton from "./partials/scroll-button";
import CategorySkeleton from "./partials/category-skeleton";
import CategoryButtons from "./partials/category-buttons";
import { useGetMoviesCategories } from "~/hooks/movies/useGetMoviesCategories";
import { moviesStore } from "~/store/movies-store";

const CategoryFilters: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const { setSelectedCategoryId } = moviesStore((state) => state);

  const { data: moviesCategories, isLoading } = useGetMoviesCategories();

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategoryId(Number(category));
    }
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
