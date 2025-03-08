"use client";

import React, { useEffect, useState } from "react";
import { Pagination, PaginationContent } from "~/components/ui/pagination";
import { moviesStore } from "~/store/movies-store";
import useWindowSize from "~/hooks/useWindowSize";
import PaginationItems from "./partials/pagination-items";

const DEFAULT_VISIBLE_PAGES = 5;

const PaginationControls: React.FC = () => {
  const { pagination, setCurrentPage } = moviesStore((state) => state);
  const [visiblePages, setVisiblePages] = useState(DEFAULT_VISIBLE_PAGES);
  const windowSize = useWindowSize();

  const width = typeof windowSize?.width === "number" ? windowSize.width : 1280;

  useEffect(() => {
    if (width < 640) {
      setVisiblePages(3);
    } else if (width < 768) {
      setVisiblePages(6);
    } else {
      setVisiblePages(8);
    }
  }, [width]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (pagination.totalPages <= 1) return null;

  return (
    <Pagination className="py-6">
      <PaginationContent className="flex-wrap justify-center gap-1">
        <PaginationItems
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          visiblePages={visiblePages}
          onPageChange={handlePageChange}
          screenWidth={width}
        />
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationControls;
