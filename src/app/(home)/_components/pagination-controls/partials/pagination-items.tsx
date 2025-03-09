import React, { useEffect, useState } from "react";
import {
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
  PaginationEllipsis,
} from "~/components/ui/pagination";
import usePageNumbers from "~/hooks/usePageNumbers";
import useWindowSize from "~/hooks/useWindowSize";
import { cn } from "~/lib/utils";
import { moviesStore } from "~/store/movies-store";

const DEFAULT_VISIBLE_PAGES = 5;

const PaginationItems: React.FC = () => {
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

  const handlePrevious = () => {
    if (pagination.currentPage > 1) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      handlePageChange(pagination.currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page === pagination.currentPage) return;
    handlePageChange(page);
  };

  const { pages, showFirstPage, showFirstEllipsis } = usePageNumbers({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    visiblePages,
  });

  return (
    <>
      <PaginationItem
        className={cn(
          "md:flex",
          pagination.currentPage === 1 && "cursor-not-allowed",
        )}
      >
        <PaginationPrevious
          onClick={handlePrevious}
          className={cn(
            pagination.currentPage === 1 && "pointer-events-none opacity-50",
          )}
        />
      </PaginationItem>

      {showFirstPage && width >= 480 && (
        <>
          <PaginationItem className="hidden xs:inline-flex">
            <PaginationLink onClick={() => handlePageClick(1)}>
              1
            </PaginationLink>
          </PaginationItem>

          {showFirstEllipsis && (
            <PaginationItem className="hidden sm:inline-flex">
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </>
      )}

      {pages.map((page: number) => (
        <PaginationItem key={page}>
          <PaginationLink
            isActive={page === pagination.currentPage}
            onClick={() => handlePageClick(page)}
            className={cn(
              page === pagination.currentPage &&
                "cursor-not-allowed bg-accent text-accent-foreground",
            )}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}

      <PaginationItem
        className={cn(
          "md:flex",
          pagination.currentPage === pagination.totalPages &&
            "cursor-not-allowed",
        )}
      >
        <PaginationNext
          onClick={handleNext}
          className={cn(
            pagination.currentPage === pagination.totalPages &&
              "pointer-events-none opacity-50",
          )}
        />
      </PaginationItem>
    </>
  );
};

export default PaginationItems;
